import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-type": "application/json"
  }
});

export async function getAllData({callback}) {
  try {
    const res = await apiClient.get("/ig/branches");
    
    callback(res)
  } catch (err) {
    callback(false)
  }
}

export async function adminLogin({data, callback}) {
  try {
    const res = await apiClient.post("/admin/login", data, {
      headers: {
        "x-access-token": "token-value",
      },
    });

    callback(res)
  } catch (err) {
    callback(false)
  }
}

export async function postData({data, callback}) {
  try {
    const res = await apiClient.post("/admin/create", data, {
      headers: {
        "x-access-token": "token-value",
      },
    });

    callback(res)
  } catch (err) {
    callback(false)
  }
}

export async function putData({data, callback}) {
  const {id} = data;

  try {
    const res = await apiClient.put(`/update/${id}`, data, {
      headers: {
        "x-access-token": "token-value",
      },
    });

    callback(res)
  } catch (err) {
    callback(false)
  }
}

export async function deleteDataById({data, callback}) {
  const {id} = data;

  try {
    const res = await apiClient.delete(`/delete/${id}`);

    callback(res)
  } catch (err) {
    callback(false)
  }
}
