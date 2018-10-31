import axios from 'axios'

const API_URL = "https://hn.algolia.com/api/v1/"
//sort=byPopularity&prefix&page=0&dateRange=all&type=all&query=Haskell

const instance = axios.create({
  baseURL: 'https://hn.algolia.com/api/v1/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

export const getItemId = (id) => {
    axios.get(`${API_URL}items/${id}`)
      .then(response => response.data)
      .catch(error => error)
}

export const search = (query) => {
	const endpoint = `${API_URL}${query}`;

    return axios.get(endpoint)
      .then(response => response.data)
      .catch(error => error)
}
