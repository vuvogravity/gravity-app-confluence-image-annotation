import axios from "axios";

export const IMAGE_UPLOAD_URL = "https://64mbv10co3.execute-api.us-east-2.amazonaws.com/prod/upload";
// export const IMAGE_UPLOAD_URL = 'http://localhost:3000/dev/upload';

export const getImageUpoad = async (headers) => {
  try {
    const { data } = await axios.get(IMAGE_UPLOAD_URL, { headers: headers });
    console.log("get image url", data);
    return data;
  } catch (err) {
    console.log("error get image upload url", err);
    throw new Error(err);
  }
};

export const getDataJson = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error, "getDataJson");
    return false;
    // throw new Error(error);
  }
};
