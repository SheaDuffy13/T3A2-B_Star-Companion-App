import api from '../config/api';

export async function loginUser(userData) {
	const response = await api.post('/api/user/login', userData);
	console.log('User data received: ', response);
	return response.data;
}

export async function logoutUser() {
	return api.get('/api/user/logout');
}

export async function registerUser(userInfo) {
	const response = await api.post('/api/user/register', userInfo);
	console.log('Got new user back from server', response);
	return response.data;
}

export async function getProfile() {
    const response = await api.get('/api/user/profile');
    return response.data;
  }
  
  export async function updateProfile(updatedUser) {
    const response = await api.put('/api/user/profile', updatedUser);
    return response.data;
  }
  
  export async function deleteProfile() {
    const response = await api.delete('/api/user/profile');
    return response.data;
  }



// Get loggedInUser from localStorage
export function getLoggedInUser() {
	return localStorage.getItem('loggedInUser');
}
export function getAdminUser() {
	return localStorage.getItem('adminUser');
}

// Store loggedInUser username in local storage
export function setLoggedInUser(user) {
	console.log('setting user: ', user);
	user
		? localStorage.setItem('loggedInUser', user)
		: localStorage.removeItem('loggedInUser');
}
