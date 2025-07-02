import axios from 'axios';

const API_URL = 'https://node-product-distribution-backend.agiletechnologies.in/admin/login';

export const login = async (email, password) => {
  const response = await axios.post(API_URL, {
    email,
    password
  });

  if (response.data && response.data.data && response.data.data.authToken) {
    return {
      token: response.data.data.authToken,
      user: response.data.data 
    };
  } else {
    throw new Error('Invalid response from server');
  }
};


