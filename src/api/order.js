import { Request } from './config';

// API calls for orders

export const getOrders = () =>
  new Promise((resolve, reject) => {
    Request.get('/order')
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getOrderById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/order/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const createOrder = (order) =>
  new Promise((resolve, reject) => {
    Request.post('/order', order)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const updateOrder = (id, order) =>
  new Promise((resolve, reject) => {
    Request.put(`/order/${id}`, order)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const deleteOrder = (id) =>
  new Promise((resolve, reject) => {
    Request.delete(`/order/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });