import axios from 'axios';
import { BASE_URL } from '../constant/endPoint';

export const getOrderItem = async data => {
    // console.log(data);
    try{
        const response = await axios.get(`${BASE_URL}/OrderItem`, data);
        //console.log(response);

        if(response.status === 201 || response.status ===200){
            //console.log('GET OrderItem data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }

    } catch(error) {
        console.error("Axios error in get OrderItem: ", error);
        return null;
    }
}

export const postOrderItem = async data => {
    try{
        const response = await axios.post(`${BASE_URL}/OrderItem`, data);
        if(response.status === 201 || response.status ===200){
            //console.log('POST OrderItem data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }
    } catch (error){
        console.error("Axios error in post OrderItem: ", error);
        return null;
    }
}