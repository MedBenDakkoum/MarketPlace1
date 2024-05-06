const baseUrl = 'http://localhost:5000';

export async function getPublicSellerInfoById(id){
    return (await fetch(`${baseUrl}/api/seller/${id}`, {credentials: 'include'})).json();
}
export async function getUserById(id) {
    return await (await fetch(baseUrl + `/api/user/${id}`, {credentials: 'include'})).json()
}