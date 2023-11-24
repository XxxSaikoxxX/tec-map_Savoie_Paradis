import axios from 'axios';

const url = 'https://api.joeleprof.com/tec-map';

export async function getMyFriends() {
    const token = sessionStorage.getItem('token');
    const headers = { headers: { 'Authorization': 'Bearer ' + token } };
    try {
        const { data } = await axios.get(`${url}/friends`, headers);
        return data;
    } catch (error) {
        return false;
    }
}

export async function addFriend(friendsId) {
    const token = sessionStorage.getItem('token');
    const headers = { headers: { 'Authorization': 'Bearer ' + token } };
    try {
        await axios.post(`${url}/friends/${friendsId}`, {}, headers);
        return true;
    } catch (error) {
        return false;
    }
}

export async function deleteFriend(friendsId) {
    const token = sessionStorage.getItem('token');
    const headers = { headers: { 'Authorization': 'Bearer ' + token } };
    try {
        await axios.delete(`${url}/friends/${friendsId}`, headers);
        return true;
    } catch (error) {
        return false;
    }
}
