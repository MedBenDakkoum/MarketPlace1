import axios from 'axios';
const baseUrl = 'http://localhost:5000';

export async function getLocationCountry() {
    try {
      const response = await axios.get(`${baseUrl}/api/settings/location/country`, {
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
  export async function getLocationStates() {
    try {
      const response = await axios.get(`${baseUrl}/api/settings/location/states`, {
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
  export async function getStateCities(state) {
    try {
      const response = await axios.get(`${baseUrl}/api/settings/location/states/${state}`, {
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
  export async function emailInUse(email) {
    try {
      const response = await axios.get(`${baseUrl}/api/settings/email/${email}`, {
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
  export async function getCategories() {
    try {
      const response = await axios.get(`${baseUrl}/api/public/categories`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  }
  export async function getConfig(){
    try {
      const response = await axios.get(`${baseUrl}/api/public/config`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  }
  export async function searchKeyword(q){
    try {
      const response = await axios.post(`${baseUrl}/api/public/search`, {keyword:q},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  }
  export async function getCategoriesFromRefs(refs){
    try {
      const response = await axios.post(`${baseUrl}/api/public/categories`, {refs:refs},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  }
export async function getAllLayouts(){
  try {
    const response = await axios.get(`${baseUrl}/api/public/home/layout`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
}
export async function getMostSold(){
  try {
    const response = await axios.get(`${baseUrl}/api/public/mostsold`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
}
  