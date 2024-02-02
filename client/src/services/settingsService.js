const baseUrl = 'http://localhost:5000';

export async function getSettings() {
    return (await fetch(`${baseUrl}/settings`)).json();
}

export async function updateSettings(data) {
    return (await fetch(`${baseUrl}/settings`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
        })).json();
}
