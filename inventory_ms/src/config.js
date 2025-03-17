 import axios from "axios";
 export const config = {
  
    backendUrl: "http://localhost:8787",

  };
  export default config;
    export const baseURL = "http://localhost:8787";

 
  export const httpClient = axios.create({
      baseURL,
    });
