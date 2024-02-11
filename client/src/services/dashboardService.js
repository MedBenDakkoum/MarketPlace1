const baseUrl = 'http://localhost:5000';

export async function getDashboardInfo() {
    return (await fetch(`${baseUrl}/api/seller/dashboard`, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })).json();
}
export async function getSellerProfile(){
    return (await fetch(`${baseUrl}/api/seller/`, {credentials: 'include'})).json();
}
export async function getStore(){
    return (await fetch(`${baseUrl}/api/seller/store`, {credentials: 'include'})).json();
}
export async function updateStore(data) {
    return (await fetch(`${baseUrl}/api/seller/store`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({data})
    })).json();
}
export async function uploadImage(data) {
    return (await fetch(`${baseUrl}/api/seller/image/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({data})
    })).json();
}
export async function updateProfile(data) {
    return (await fetch(`${baseUrl}/api/seller/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({data})
    })).json();
}