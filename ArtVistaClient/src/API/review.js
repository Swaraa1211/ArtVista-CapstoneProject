import axios from 'axios';
import { BASE_URL } from '../constant/endPoint';


export const getReview = async data => {
    // console.log(data);
    try{
        const response = await axios.get(`${BASE_URL}/Review`, data);
        //console.log(response);

        if(response.status === 201 || response.status ===200){
            //console.log('GET Review data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }

    } catch(error) {
        console.error("Axios error in get Review: ", error);
        return null;
    }
}

export const postReview = async data => {
    try{
        const response = await axios.post(`${BASE_URL}/Review`, data);
        if(response.status === 201 || response.status ===200){
            //console.log('POST Review data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }
    } catch (error){
        console.error("Axios error in post Review: ", error);
        return null;
    }
}