import api from '../config/api';

// export async function signup(user) {
//   try {
//     const response = await api.post('/api/user/signup', user);
//     localStorage.setItem('token', response.data.token);
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function login(user) {
//   try {
//     const response = await api.post('/api/user/login', user);
//     localStorage.setItem('token', response.data.token);
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function signup(user) {
  try {
    const response = await api.post('/api/user/signup', user);
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    console.error(error);
    throw error; // re-throw the error
  }
}

export async function login(user) {
  try {
    const response = await api.post('/api/user/login', user);
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    console.error(error);
    throw error; // re-throw the error
  }
}

export async function deleteProfile() {
  try {
    await api.delete('/api/user/deleteProfile');
  } catch (error) {
    console.error(error);
    throw error; // re-throw the error
  }
}