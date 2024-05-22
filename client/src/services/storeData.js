import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export async function getStoreByLink(link) {
    return await (await fetch(baseUrl + `/api/store/${link}`, {credentials: 'include'})).json()
}
export async function getOrders(){
    try {
        const response = await axios.get(`${baseUrl}/api/store/orders`, {
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
export async function passOrderToSupplier(orderId){
  try {
      const response = await axios.post(`${baseUrl}/api/store/orders/${orderId}/supplier`,{},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error getting order to supplier:", error);
      throw error;
    }
}
