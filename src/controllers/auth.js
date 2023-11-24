import axios from 'axios';

const url = 'https://api.joeleprof.com/tec-map';

export async function login(email, password) {
    const body = {
        'email': email,
        'password': password
    };
    try {
        const { data } = await axios.post(`${url}/auth/login`, body);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('isAdmin', data.isAdmin);
        return true;
    } catch (error) {
        return false;
    }

}

export async function register(email, password, userName, fullName) {
    const body = {
        'email': email,
        'password': password,
        'username': userName,
        'fullName': fullName
    };
    try {
        const { data } = await axios.post(`${url}/auth/register`, body);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('isAdmin', data.isAdmin);
        return true;
    } catch (error) {
        return false;
    }

}