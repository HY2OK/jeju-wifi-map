import axios from "axios";

const searchData = async (address: string) => {
  const response = await axios.get(`/api/wifi?addressDong=${address}`);

  return response.data;
};

export default searchData;
