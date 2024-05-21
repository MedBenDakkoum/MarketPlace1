import axios from 'axios';
const baseUrl = 'http://localhost:5000';

export async function getDashboardInfo() {
    return (await fetch(`${baseUrl}/api/seller/dashboard`, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })).json();
}
export async function getProducts() {
    try {
      const response = await axios.get(`${baseUrl}/api/seller/products`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }
export async function getInitialProdData(id) {
    try {
        const response = await axios.get(`${baseUrl}/api/seller/products/${id}/init`, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error getting products:", error);
        throw error;
    }
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
    try {
        const response = await axios.put(`${baseUrl}/api/seller/`, {data}, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating seller:', error);
        throw error;
    }
}

export async function getProductPrice(pid){
    return (await fetch(`${baseUrl}/api/seller/products/${pid}/price`, {credentials: 'include'})).json();
}
export async function changeProductPrice(id,data) {
    try {
        const response = await axios.put(`${baseUrl}/api/seller/products/${id}/price`, data, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error changing product price:", error);
        throw error;
    }
}
export async function getProductImages(pid){
    return (await fetch(`${baseUrl}/api/seller/products/${pid}/images`, {credentials: 'include'})).json();
}
export async function updateProductImages(id,data) {
    try {
        const response = await axios.put(`${baseUrl}/api/seller/products/${id}/images`, data, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error changing product price:", error);
        throw error;
    }
}
export async function getProductSeo(pid){
    return (await fetch(`${baseUrl}/api/seller/products/${pid}/seo`, {credentials: 'include'})).json();
}
export async function addProduct(data) {
    try {
        const response = await axios.post(`${baseUrl}/api/seller/products`, data, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error adding new product :", error);
        throw error;
    }
}
export async function updateProductSeo(id,data) {
    try {
        const response = await axios.put(`${baseUrl}/api/seller/products/${id}/seo`, data, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error changing product seo info:", error);
        throw error;
    }
}
export async function getInitialProducts(){
    try {
        const response = await axios.get(`${baseUrl}/api/seller/products/init`, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error getting products:", error);
        throw error;
    }
}
export async function getProductAttributes(id){
    try {
        const response = await axios.get(`${baseUrl}/api/seller/products/${id}/attributes`, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error getting products attributes:", error);
        throw error;
    }
}
export async function toggleActive(id) {
    try {
        const response = await axios.post(`${baseUrl}/api/seller/products/${id}/toggle`, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error changing product price:", error);
        throw error;
    }
}
export async function removeProduct(id) {
    try {
        const response = await axios.post(`${baseUrl}/api/seller/products/${id}/remove`, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error changing product price:", error);
        throw error;
    }
}
export async function getTransactions() {
    try {
        const response = await axios.get(`${baseUrl}/api/seller/transactions/`, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error getting transactions:", error);
        throw error;
    }
}
export async function requestTransaction() {
    try {
        const response = await axios.post(`${baseUrl}/api/seller/transactions/request`,{} ,{
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error requesting transaction:", error);
        throw error;
    }
}
export async function getNotifications() {
    try {
        const response = await axios.get(`${baseUrl}/api/seller/notifications/`, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error getting notifications:", error);
        throw error;
    }
}
export async function setNotificationsToRead() {
    try {
        const response = await axios.get(`${baseUrl}/api/seller/notifications/read`, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error settin notifications to read:", error);
        throw error;
    }
}
export async function subscribeToMarketPlace() {
    try {
        const response = await axios.post(`${baseUrl}/api/seller/subscribe`, {},{
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error settin notifications to read:", error);
        throw error;
    }
}