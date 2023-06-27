import axios from 'axios';
import { BASE_URL } from '../constant/endPoint';


export const getOrders = async data => {
    // console.log(data);
    try{
        const response = await axios.get(`${BASE_URL}/Orders`, data);
        //console.log(response);

        if(response.status === 201 || response.status ===200){
            //console.log('GET Orders data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }

    } catch(error) {
        console.error("Axios error in get Orders: ", error);
        return null;
    }
}

export const postOrders = async data => {
    try{
        const response = await axios.post(`${BASE_URL}/Orders`, data);
        if(response.status === 201 || response.status ===200){
            //console.log('POST Orders data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }
    } catch (error){
        console.error("Axios error in post Orders: ", error);
        return null;
    }
}