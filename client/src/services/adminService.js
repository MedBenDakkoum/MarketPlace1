const baseUrl = 'http://localhost:5000';

export async function updateSeller( id,message) {
    return (await fetch(`${baseUrl}/api/admin/sellers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({message})
    })).json();
}
