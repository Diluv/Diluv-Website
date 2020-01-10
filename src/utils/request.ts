import axios from 'axios';


export function post(url: string, data: any, headers: any = {
  'Accept': 'application/json'
}) {
  if(process.browser) {
    if (!headers.Authorization && localStorage && localStorage.getItem("accessToken")) {
      headers.Authorization = "Bearer " + localStorage.getItem("accessToken")
    }
  }
  return axios.post(url, data, {
    headers: headers
  })
}

