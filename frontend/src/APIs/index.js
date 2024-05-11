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
