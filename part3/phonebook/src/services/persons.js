import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl);
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
}

const deletePerson = (id) => {
  const url = baseUrl + `/${id}/`
  return axios.delete(url);
}

const exports = { getAll, create, deletePerson }

export default exports;