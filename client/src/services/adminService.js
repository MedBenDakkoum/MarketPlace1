const baseUrl = 'http://localhost:5000';

export async function updateSeller( id,data) {
    return (await fetch(`${baseUrl}/api/admin/sellers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({data})
    })).json();
}

export async function uploadImage(data) {
    return (await fetch(`${baseUrl}/api/admin/image/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({data})
    })).json();
}