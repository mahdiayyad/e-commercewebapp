import instance from "./axiosInstance";

if (localStorage.getItem("site")) {
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("site")}`;
  instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
}

export const forgetPassword = async (email) => {
  try {
    const response = await instance.post(`/forgetPasssword`, { email });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const verifyResetPasswordToken = async (token) => {
  try {
    const response = await instance.get(`/verify-reset-token/${token}`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const resetPassword = async (payload) => {
  try {
    const response = await instance.post("/reset-password", { ...payload });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

/*************************************************/
/************* START - Category API **************/
export const getCategories = async () => {
  try {
    const response = await instance.get("/get-all-categroies");
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await instance.get("/category?id=" + id);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const addCategory = async (payload) => {
  try {
    const response = await instance.post("/category", { ...payload });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const editCategory = async (id, payload) => {
  try {
    const response = await instance.put("/category/" + id, { ...payload });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await instance.delete("/category/" + id);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

/************* END - Category API **************/
/*************************************************/

export const getDiscounts = async () => {
  try {
    const response = await instance.get("/get-all-discounts");
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

/*************************************************/
/************* START - Product API **************/
export const getProducts = async () => {
  try {
    const response = await instance.get("/get-all-products");
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await instance.get("/product?id=" + id);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const addProduct = async (formData) => {
  try {
    const response = await instance.post("/product", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const editProduct = async (id, formData) => {
  try {
    const response = await instance.put("/product/" + id, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await instance.delete("/product/" + id);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
/************* END - Product API **************/
/*************************************************/
