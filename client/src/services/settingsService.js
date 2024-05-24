import axios from 'axios';
const baseUrl = 'http://localhost:5000';

export async function checkSessions() {
    try {
      const response = await axios.get(`${baseUrl}/api/settings/check-sessions`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error getting sessions:", error);
      throw error;
    }
  }
export async function getSettings() {
    return (await fetch(`${baseUrl}/api/settings`)).json();
}

export async function updateSettings(data) {
    return (await fetch(`${baseUrl}/api/settings`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
        })).json();
}
