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

export const getCategories = async () => {
  try {
    const response = await instance.get("/get-all-categroies");
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getDiscounts = async () => {
  try {
    const response = await instance.get("/get-all-discounts");
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
