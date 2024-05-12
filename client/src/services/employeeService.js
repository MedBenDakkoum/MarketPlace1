import axios from 'axios';
const baseUrl = "http://localhost:5000";

export async function getBasicInfo() {
    try {
      const response = await axios.get(`${baseUrl}/api/employee/basicInfo`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  export async function getOrders() {
    try {
      const response = await axios.get(`${baseUrl}/api/employee/orders`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  export async function getOrder(id) {
    try {
      const response = await axios.get(`${baseUrl}/api/employee/orders/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error getting Orders:", error);
      throw error;
    }
  }
  export async function addOrderMessage(orderId,data) {
    try {
      const response = await axios.post(`${baseUrl}/api/employee/orders/${orderId}/messages`, {data}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error changing order status:", error);
      throw error;
    }
  }
  export async function verifyOrder(orderId) {
    try {
      const response = await axios.post(`${baseUrl}/api/employee/orders/${orderId}/verify`, {},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error verifying order !", error);
      throw error;
    }
  }
  export async function getUnVerifiedSellers() {
    try {
      const response = await axios.get(`${baseUrl}/api/employee/sellers`,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error verifying order !", error);
      throw error;
    }
  }
  export async function getSellerById(id) {
    try {
      const response = await axios.get(`${baseUrl}/api/employee/sellers/${id}`,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error verifying order !", error);
      throw error;
    }
  }
export async function verifySeller(id) {
  try {
    const response = await axios.post(`${baseUrl}/api/employee/sellers/${id}/verify`,{},{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error verifying order !", error);
    throw error;
  }
}
export async function getCategories() {
  try {
    const response = await axios.get(`${baseUrl}/api/employee/categories`, {
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