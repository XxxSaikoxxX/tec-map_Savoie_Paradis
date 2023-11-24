import axios from 'axios';

const url = 'https://api.joeleprof.com/tec-map';

export async function getMe() {
    const token = sessionStorage.getItem('token');
    const headers = { headers: { 'Authorization': 'Bearer ' + token } };
    try {
        const { data } = await axios.get(`${url}/me`, headers);
        return data;
    } catch (error) {
        return false;
    }
}

export async function putMe(username, fullName, email) {
    const token = sessionStorage.getItem('token');
    const headers = { headers: { 'Authorization': 'Bearer ' + token } };
    const data = {
        'username ': username,
        'email ': email,
        'fullName': fullName
    }
    try {
        const response = await axios.put(`${url}/me`, { data }, headers);
        return response;
    } catch (error) {
        return false;
    }
}

export async function deleteMe() {
    const token = sessionStorage.getItem('token');
    const headers = { headers: { 'Authorization': 'Bearer ' + token } };
    try {
        await axios.delete(`${url}/me`, headers);
        return true;
    } catch (error) {
        return false;
    }
}