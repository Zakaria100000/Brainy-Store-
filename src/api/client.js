import { Request } from './config';

// api calls

export const getClients = () =>
  new Promise((resolve, reject) => {
    Request.get('/client')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  export const login = async (credentials) => {
    try {
      const res = await Request.post('/api/login', credentials); 
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  

export const getClientById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/client/find/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  // works just fine for the admin (superUser) too 

export const createClient = (client) =>
  new Promise((resolve, reject) => {
    Request.post('/client', client)
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((err) => {
        reject(err.toJSON());
      });
  });

export const updateClient = (client, id) =>
  new Promise((resolve, reject) => {
    Request.put(`/client/${id}`, client)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });



export const deleteClient = (clientId) =>
  new Promise((resolve, reject) => {
    Request.delete(`/client/${clientId}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

  export const tryLoginWithToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      // Update the URL to match the backend route
      const response = await Request.get('/api/token', {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      return response.data;
    } catch (error) {
      console.error("Error during token validation:", error);
      throw error;
    }
  };
  
  
