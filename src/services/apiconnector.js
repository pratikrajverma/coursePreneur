

import axios from "axios"   //Yeh line axios library ko import kar leti hai. axios library HTTP requests bhejne aur prapt karne ke liye use hoti hai.

export const axiosInstance = axios.create({});     //axios.create({}) ek axios instance ko create karta hai. Jab aap axios.create() ka istemal karte hain, toh aap ek naya axios instance banate hain jo HTTP requests bhejne aur prapt karne ke liye istemal hota hai. 
                                                    //axios.create({}) se hi server call hota hai. axios.create({}) ek axios instance ko create karta hai, jise aap server ke saath communication ke liye use kar sakte hain. Jab aap axiosInstance() ko call karte hain, wo server pe request bhejta hai aur server se response prapt karta hai. Is axios instance ke zariye, aap URL, method, data, headers, aur anya configurations ko set kar sakte hain, aur fir axiosInstance() ko call karke server pe request bhej sakte hain. Yeh ek flexible aur powerful tareeka hai HTTP requests ko manage karne ka, aur isse aap code ko organize aur reusable bana sakte hain.
                                                    //axios.create({}) ek factory function hai jo ek naya axios instance banata hai. Jab aap ek axios instance create karte hain, toh aap use alag-alag requests ke liye istemal kar sakte hain, aur aapko har request ke liye default configurations set karne ki zarurat nahi hoti. jaise sirf post request 
                                                    
export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null, 
    });
}
