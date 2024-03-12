import axios from 'axios';
const baseUrl = "http://localhost:5000";

// export async function updateSeller(id, data) {
//   return (
//     await fetch(`${baseUrl}/api/admin/sellers/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({ data }),
//     })
//   ).json();
// }

export async function updateSeller(id, data) {
  try {
    const response = await axios.put(`${baseUrl}/api/admin/sellers/${id}`, { data }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error updating seller:", error);
    throw error;
  }
}

export async function uploadImage(data) {
  try {
    const response = await axios.post(`${baseUrl}/api/admin/image/upload`, { data }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function addSeller(data) {
  try {
    const response = await axios.post(`${baseUrl}/api/admin/sellers`, { data }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error adding seller:", error);
    throw error;
  }
}
export async function getBasicInfo() {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/basicInfo`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error adding seller:", error);
    throw error;
  }
}
export async function getCategories() {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/categories`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error getting Categories:", error);
    throw error;
  }
}