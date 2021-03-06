import axios from 'axios';


export function fetchAssets(cursor: string|null, pageSize: number, symbol: string|null) {

  const token = localStorage.getItem('jwtToken')

  return axios.get('http://localhost:8080/dashboard/api/asset', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      cursor,
      pageSize,
      symbol
    }
  })
}
