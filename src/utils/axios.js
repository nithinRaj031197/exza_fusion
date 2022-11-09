import axios from "axios";

const PAVAN = "http://192.168.100.176:8080";
const VASU = "http://192.168.100.161:8083";
const SWAGGER = "http://192.168.100.158:8080";

const instance = axios.create({
  baseURL: `${SWAGGER}/init`,
});

export default instance;
