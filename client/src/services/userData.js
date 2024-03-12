import axios from 'axios';
const baseUrl = 'http://localhost:5000';

export async function registerUser(userData) {
    return (await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
    })).json();
}
export async function uploadImage(data) {
    return (await fetch(`${baseUrl}/api/user/image/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({data})
    })).json();
}
export async function loginUser(userData) {
    return (await fetch(`/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
    })).json();
}

export async function getUser() {
    return await (await fetch(baseUrl + '/auth/getUser', {credentials: 'include'})).json()
}
export async function getInfo() {
    return await (await fetch(`${baseUrl}/api/admin`, {credentials: 'include'})).json()
}
export async function getUserActiveSells(id) {
    return (await fetch(`${baseUrl}/products/sells/active/${id}`, {credentials: 'include'})).json();
}

export async function getUserArchivedSells() {
    return (await fetch(`${baseUrl}/products/sells/archived`, {credentials: 'include'})).json();
}

export async function getUserWishlist() {
    return (await fetch(`${baseUrl}/products/wishlist/getWishlist`, {credentials: 'include'})).json();
}

// export async function editUserProfile(id, data) {
//     return (await fetch(`/api/user/${id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(data)
//     })).json();
// }
export async function editUserProfile(data) {
    try {
        const response = await axios.put(`${baseUrl}/api/user/`, {data}, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
export async function getUserById(id) {
    return await (await fetch(baseUrl + `/api/user/${id}`, {credentials: 'include'})).json()
}
export async function getCart() {
    try {
      const response = await axios.get(`${baseUrl}/api/user/cart`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error getting cart:", error);
      throw error;
    }
  }
export async function getAddress() {
    try {
      const response = await axios.get(`${baseUrl}/api/user/address`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error getting cart:", error);
      throw error;
    }
}
export async function getOrders() {
    try {
        const response = await axios.get(`${baseUrl}/api/user/orders`, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error getting orders:", error);
        throw error;
    }
}
export async function addToCart(data) {
    try {
        const response = await axios.put(`${baseUrl}/api/user/cart`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
}
export async function deleteFromCart(dataa) {
    try {
        const response = await axios.delete(`${baseUrl}/api/user/cart`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true ,
            data: dataa
        });
        return response.data;
    } catch (error) {
        console.error('Error deleteing from cart:', error);
        throw error;
    }
}
export async function makeOrder(data) {
    try {
        const response = await axios.put(`${baseUrl}/api/user/orders`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
}
export async function getUserProfile(){
    try {
        const response = await axios.get(`${baseUrl}/api/user/`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
}
