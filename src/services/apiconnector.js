

import axios from "axios"   //Yeh line axios library ko import kar leti hai. axios library HTTP requests bhejne aur prapt karne ke liye use hoti hai.

export const axiosInstance = axios.create({});    
                                                     
                                                   
                                                    
export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null, 
    });
}
