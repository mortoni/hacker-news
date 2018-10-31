import axios from 'axios'

const API_URL = "https://hn.algolia.com/api/v1/"

const instance = axios.create({
  baseURL: API_URL,
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
