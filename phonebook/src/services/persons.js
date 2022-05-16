const baseUrl = '/api/persons';

const getAll = () => fetch(baseUrl).then(r => r.json());

const create = newObject => {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newObject)
  };
  return fetch(baseUrl, request)
    .then(r => r.json())
    .then(data => {
      if ('error' in data) throw new Error(data.error);
      else return data;
    });
};

const update = (id, newObject) => {
  const request = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newObject)
  };
  return fetch(`${baseUrl}/${id}`, request)
    .then(r => r.json())
    .then(data => {
      if ('error' in data) throw new Error(data.error);
      else return data;
    });
};

const remove = id => {
  const request = {
    method: 'DELETE'
  };
  return fetch(`${baseUrl}/${id}`, request)
    .then(r => r.status);
};

const personsService = { getAll, create, update, remove };

export default personsService;