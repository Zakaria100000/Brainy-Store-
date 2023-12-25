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
      const response = await Request.post('/signin', credentials);
      return response.data;
    } 
  

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



  // Other api calls remain unchanged
  
  export const tryLoginWithToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await Request.get('/validateToken', {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      // If the token is valid, the backend should respond with success status
      // The structure of the return statement depends on your backend response
      return response.data;
    } catch (error) {
      // Handle any errors
      console.error("Error during token validation:", error);
      throw error; // Or handle it based on your application's needs
    }
  };
  
  
