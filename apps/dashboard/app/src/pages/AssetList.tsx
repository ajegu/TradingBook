import React, { ChangeEvent, SyntheticEvent, useEffect } from 'react';
import styled from 'styled-components';
import { LinkProps, NavLink as RouterNavLink } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import {
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Divider as MuiDivider,
  Grid,
  Link,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField as MuiTextField,
  Typography
} from '@material-ui/core';

import { Search as SearchIcon } from '@material-ui/icons';

import { spacing } from '@material-ui/system';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Asset, AssetPage, getAssets, getAssetState } from '../store/asset/assetSlice';
import Loader from '../components/Loader';

const NavLink = React.forwardRef<LinkProps, any>((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const TextFieldSpacing = styled(MuiTextField)(spacing);

const TextField = styled(TextFieldSpacing)<{ m?: number }>`
  width: 200px;
`;

const Button = styled(MuiButton)(spacing);

type HeadCell = {
  id: string
  alignment: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined
  label: string
  disablePadding?: boolean
}
const headCells: Array<HeadCell> = [
  { id: 'id', alignment: 'left', label: 'Asset ID' },
  { id: 'name', alignment: 'left', label: 'Name' },
  { id: 'symbol', alignment: 'left', label: 'Symbol' }
];

type EnhancedTableHeadPropsType = {
  numSelected: number
  order: 'desc' | 'asc'
  orderBy: string
  rowCount: number
}
const EnhancedTableHead: React.FC<EnhancedTableHeadPropsType> = (props) => {
  const { order, orderBy } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell: HeadCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

function EnhancedTable() {
  const [order] = React.useState<'desc' | 'asc'>('asc');
  const [orderBy] = React.useState('customer');
  const [selected] = React.useState<Array<string>>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [symbol, setSymbol] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState<AssetPage|undefined>(undefined);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    setCurrentPage(undefined);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setCurrentPage(undefined);
  };

  const handleSearch = (event: SyntheticEvent) => {
    event.preventDefault();
    setCurrentPage(undefined);
    setPage(0);
  };

  const handleSearchSymbol = (event: ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.currentTarget.value);
  };


  const dispatch = useAppDispatch();
  const assetState = useAppSelector(getAssetState);

  useEffect(() => {

    const stateCurrentPage = assetState.pages[page] || null;
    if (stateCurrentPage && !currentPage && stateCurrentPage.symbol === symbol && stateCurrentPage.pageSize === rowsPerPage) {
      setCurrentPage(stateCurrentPage)
    }

    if (!currentPage) {
      dispatch(getAssets({ page, pageSize: rowsPerPage, symbol: symbol }));
    }

  }, [currentPage, page, rowsPerPage, assetState, symbol, dispatch]);

  let emptyRows = 0;
  if (currentPage && currentPage.assets.length < rowsPerPage) {
    emptyRows = Math.min(rowsPerPage - currentPage.assets.length);
  }

  let paginationCount = -1;
  if (!currentPage?.cursor?.next) {
    paginationCount = (rowsPerPage * page) + (currentPage?.assets.length || 0);
  }

  return (
    !currentPage
      ? <Loader /> :
      <div>
        <Grid>
          <form onSubmit={handleSearch} autoComplete="off">
            <TextField
              id='standard-name'
              label='Symbol'
              variant='outlined'
              size='small'
              m={2}
              onChange={handleSearchSymbol}
              value={symbol}
            />
            <Button variant='contained' color='primary' m={2} onClick={handleSearch} type="submit">
              <SearchIcon />
            </Button>
          </form>
        </Grid>

        <Paper>
          <TableContainer>
            <Table
              aria-labelledby='tableTitle'
              size={'medium'}
              aria-label='enhanced table'
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                rowCount={currentPage.assets.length}
              />
              <TableBody>
                {currentPage.assets.map((row: Asset, index: number) => {

                  return (
                    <TableRow
                      hover
                      key={`${row.externalReference}-${index}`}
                    >

                      <TableCell align='left'>#{row.externalReference}</TableCell>
                      <TableCell align='left'>{row.name}</TableCell>
                      <TableCell align='left'>{row.symbol}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (53) * emptyRows }}>
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={paginationCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
  );
}

function AssetList() {

  return (
    <React.Fragment>
      <Helmet title='Assets' />

      <Grid
        justify='space-between'
        container
        spacing={10}
      >
        <Grid item>
          <Typography variant='h3' gutterBottom display='inline'>
            Assets
          </Typography>

          <Breadcrumbs aria-label='Breadcrumb' mt={2}>
            <Link component={NavLink} exact to='/'>
              TradingBook
            </Link>
            <Typography>Admin - Assets</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AssetList;
