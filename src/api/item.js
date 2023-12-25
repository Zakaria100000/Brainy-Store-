import { Request } from './config';

// API calls for items

export const getItems = () =>
  new Promise((resolve, reject) => {
    Request.get('/item')
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getItemById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/item/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const createItem = (item) =>
  new Promise((resolve, reject) => {
    Request.post('/item', item)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const updateItem = (id, item) =>
  new Promise((resolve, reject) => {
    Request.put(`/item/${id}`, item)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const deleteItem = (id) =>
  new Promise((resolve, reject) => {
    Request.delete(`/item/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
