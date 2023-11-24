import axios from 'axios';

const url = 'https://api.joeleprof.com/tec-map';

export async function getAllUsers() {
    const token = sessionStorage.getItem('token');
    const headers = { headers: { 'Authorization': 'Bearer ' + token } };
    console.log(headers);
    try {
        const { data } = await axios.get(`${url}/users`, headers);
        return data;
    } catch (error) {
        return false;
    }
}