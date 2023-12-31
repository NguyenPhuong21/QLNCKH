// Api.js
import local from "./local";

const API_BASE_URL = "http://localhost:1337/api";

export const get = async ({ url, data }) => {
  let token = local.get("token");
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    const data1 = await response.json();
    return data1;
  } catch (error) {
    console.error("Error fetching faculties:", error);
    throw error;
  }
};

export const Post = async ({ url, data }) => {
  let token = local.get("token");
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    const data1 = await response.json();
    return data1;
  } catch (error) {
    console.error("Error fetching faculties:", error);
    throw error;
  }
};

export const Put = async ({ url, data }) => {
  let token = local.get("token");
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    const data1 = await response.json();
    return data1;
  } catch (error) {
    console.error("Error fetching faculties:", error);
    throw error;
  }
};

export const Delete = async ({ url, data }) => {
  let token = local.get("token");
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    const data1 = await response.json();
    return data1;
  } catch (error) {
    console.error("Error fetching faculties:", error);
    throw error;
  }
};

export const UploadFileToServer = async ({
  file,
  onSuccess,
  onError,
  onData,
}) => {
  try {
    // Create a FormData object and append the file to it
    const formData = new FormData();
    formData.append("files", file);

    // Make a POST request to your server's upload endpoint
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    onSuccess(data, file);
    onData(data);
  } catch (error) {
    onError();
  }
};
