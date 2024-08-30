
import { dbLink, userDbLink } from './vars.js';

export async function putdb(path, data) {
    const URL = `${dbLink}/${path}.json`;
    await fetch(URL, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function getdb(path) {
    const URL = `${dbLink}/${path}.json`;
    const response = await fetch(URL);
    const data = await response.json();
    return data
}

export async function deldb(path) {
    const URL = `${dbLink}/${path}.json`;
    await fetch(URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
}


export async function postdb(path, data) {
    const URL = `${userDbLink}/${path}.json`;
    const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
};