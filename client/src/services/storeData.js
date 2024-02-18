const baseUrl = 'http://localhost:5000';

export async function getStoreByLink(link) {
    return await (await fetch(baseUrl + `/api/store/${link}`, {credentials: 'include'})).json()
}