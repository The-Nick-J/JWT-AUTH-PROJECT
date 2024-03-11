const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            results: null,
            isLogin: false,
            showModalSignup: false,
            showModalSignin: false
        },
        actions: {
            APICall: async (url, options) => {
                try {
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        console.error('Error: ' + response.status, response.statusText);
                        throw new Error(response.statusText);
                    }
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error in fetch:', error);
                    throw error;
                }
            },

            signin: async (data) => {
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
                try {
                    const response = await getActions().APICall(`${process.env.BACKEND_URL}/api/signin`, options);
                    if (response.access_token) {
                        getActions().signedIn();
                        localStorage.setItem('access_token', response.access_token);
                        setStore({ showModalSignin: false }); // Assuming you want to close the modal on successful login
                    } else {
                        console.error('Something went wrong, could not log in.', response);
                    }
                } catch (error) {
                    console.error('Signin failed:', error);
                }
            },

            signup: async (data) => {
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
                try {
                    const response = await getActions().APICall(`${process.env.BACKEND_URL}/api/signup`, options);
                    console.log('Signup successful', response);
                    // Here you can add additional logic on successful signup if needed.
                } catch (error) {
                    console.error('Signup failed:', error);
                }
            },

            getProfileUser: async (user) => {
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Assuming the token is required
                    },
                }
                try {
                    const response = await getActions().APICall(`${process.env.BACKEND_URL}/api/profile/${user}`, options);
                    return response.results;
                } catch (error) {
                    console.error('Failed to get user profile:', error);
                }
            },

            getUserLoggedIn: async () => {
                if (localStorage.getItem('access_token')) {
                    const options = {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        }
                    }
                    try {
                        const response = await getActions().APICall(`${process.env.BACKEND_URL}/api/profile/user`, options);
                        return response.results;
                    } catch (error) {
                        console.error('Failed to check logged-in user:', error);
                        return 'None';
                    }
                } else return 'None';
            },

            signedIn: () => {
                setStore({ isLogin: true });
            },

            signedOut: () => {
                localStorage.removeItem('access_token');
                setStore({ isLogin: false });
            },

            showModalSignin: (value) => {
                setStore({ showModalSignin: value });
            },

            showModalSignup: (value) => {
                setStore({ showModalSignup: value });
            }
        }
    };
};

export default getState;
