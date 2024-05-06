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
export async function loginAdmin(data) {
  try {
    const response = await axios.post(`${baseUrl}/auth/system/login`, data ,{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in as admin:", error);
    throw error;
  }
}
export async function changeUserActive(id) {
  try {
    const response = await axios.post(`${baseUrl}/api/admin/customers/${id}/active`, {}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error updating customer activity:", error);
    throw error;
  }
}
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
export async function getOrders() {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/orders`, {
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
export async function getOrder(id) {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/orders/${id}`, {
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

export async function getMpProducts() {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/mp/products`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting Products:", error);
    throw error;
  }
}
export async function updateOrderStatus(orderId,data) {
  try {
    const response = await axios.post(`${baseUrl}/api/admin/orders/${orderId}/status`, {data}, {
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
export async function addOrderMessage(orderId,data) {
  try {
    const response = await axios.post(`${baseUrl}/api/admin/orders/${orderId}/messages`, {data}, {
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
export async function getInvoices(data) {
  try {
    const response = await axios.post(`${baseUrl}/api/admin/orders/invoices`, {data}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error getting invoices:", error);
    throw error;
  }
}
export async function getCarts() {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/carts`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error getting carts:", error);
    throw error;
  }
}

export async function getCustomers() {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/customers`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error getting customers:", error);
    throw error;
  }
}
export async function getSellers() {
  return (await fetch(`${baseUrl}/api/admin/sellers`, {credentials: 'include'})).json();
}
export async function getSellerById(id){
  return (await fetch(`${baseUrl}/api/admin/sellers/${id}`, {credentials: 'include'})).json();
}
export async function getSellersOrders() {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/mp/orders`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error getting customers:", error);
    throw error;
  }
}
export async function getSingleSellerOrders(id) {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/mp/orders/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error getting customers:", error);
    throw error;
  }
}
export async function getEmployees() {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/employees`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error getting employees:", error);
    throw error;
  }
}
export async function updateEmployee(id,data) {
  try {
    const response = await axios.post(`${baseUrl}/api/admin/employees/${id}`,data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error updating employee:", error);
    throw error;
  }
}
export async function addEmployee(data) {
  try {
    const response = await axios.put(`${baseUrl}/api/admin/employees`,data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error adding employee:", error);
    throw error;
  }
}
export async function getEmployeeById(id) {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/employees/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error getting employee:", error);
    throw error;
  }
}
export async function getReviewsProducts() {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/reviews/`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error getting employee:", error);
    throw error;
  }
}

export async function removeReview(pId){
  try {
      const response = await axios.delete(`${baseUrl}/api/admin/reviews/${pId}`, {
          headers: {
              'Content-Type': 'application/json',
          },
          withCredentials: true,
      });
      return response.data;
  } catch (error) {
      console.error('Error sending reset pass link:', error);
      throw error;
  }
}