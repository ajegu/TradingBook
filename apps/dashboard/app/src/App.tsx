import React from "react";

import { Helmet } from 'react-helmet';

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";

import maTheme from "./theme";
import Routes from "./routes/Routes";

function App() {
  return (
    <React.Fragment>
      <Helmet
        titleTemplate="%s | TradingBook"
        defaultTitle="TradingBook - Invest tool"
      />
      <StylesProvider injectFirst>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider theme={maTheme[0]}>
            <ThemeProvider theme={maTheme[0]}>
              <Routes />
            </ThemeProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </React.Fragment>
  );
}

export default App;
