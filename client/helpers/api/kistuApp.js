import axios from "axios";

const kitsuApp = axios.create({
  baseURL: "https://kitsu.io/api/edge/",
  responseType: "json",
});

export default kitsuApp;
