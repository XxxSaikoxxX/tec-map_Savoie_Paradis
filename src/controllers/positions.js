import axios from 'axios';

const url = 'https://api.joeleprof.com/tec-map';

export async function putMyPosition(lat, long) {
    const token = sessionStorage.getItem('token');
    const headers = { headers: { 'Authorization': 'Bearer ' + token } };
    const { data } = {
        'lat': lat,
        'long': long
    }
    try {
        await axios.put(`${url}/position`, { data }, headers);
        return true;
    } catch (error) {
        return false;
    }
}

export async function getPositionsFriends() {
    const token = sessionStorage.getItem('token');
    const headers = { headers: { 'Authorization': 'Bearer ' + token } };
    try {
        const { data } = await axios.put(`${url}/position/friends`, headers);
        return data;
    } catch (error) {
        return false;
    }
}