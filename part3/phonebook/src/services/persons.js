import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl);
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
}

const deletePerson = (id) => {
  const url = baseUrl + `/${id}/`;
  return axios.delete(url);
}

const put = (modifiedObject, id) => {
  const url = baseUrl + `/${id}/`;
  return axios.put(url, modifiedObject);
}


const exports = { getAll, create, deletePerson, put }

export default exports;