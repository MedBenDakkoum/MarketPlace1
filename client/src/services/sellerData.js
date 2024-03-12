const baseUrl = 'http://localhost:5000';

export async function getSellers() {
    return (await fetch(`${baseUrl}/api/admin/sellers`, {credentials: 'include'})).json();
}
export async function getSellerById(id){
    return (await fetch(`${baseUrl}/api/admin/sellers/${id}`, {credentials: 'include'})).json();
}
export async function getPublicSellerInfoById(id){
    return (await fetch(`${baseUrl}/api/seller/${id}`, {credentials: 'include'})).json();
}
export async function getUserById(id) {
    return await (await fetch(baseUrl + `/api/user/${id}`, {credentials: 'include'})).json()
}