import axios from "./axios";

export const getWhiteListInfo = async (address: string, saleMode: string) => {
  try {
    let response = await axios.get(`/whitelist/${saleMode}/${address}`);
    return response.data;
  } catch (error: any) {
    console.log("whitelisterror: ", error);
    return Promise.reject(error.response.data.message);
  }
};

export const getWhitelistCount = async (saleMode: string) => {
  try {
    let response = await axios.get(`/whitelist-count/${saleMode}`);
    return response.data.count;
  } catch (error: any) {
    console.log('whitelist-count: ', error);
    return 0;
  }
}



