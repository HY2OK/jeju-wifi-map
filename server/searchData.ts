import axios from "axios";
import { testData } from "./db";

const searchData = async (address: string) => {
  const response = await axios.get(`/api/wifi?addressDong=${address}`);

  return response.data;
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // return testData;
};

export default searchData;
