import axios from 'axios';
import { BASE_URL } from '../constant/endPoint';


export const getCart = async data => {
    // console.log(data);
    try{
        const response = await axios.get(`${BASE_URL}/Cart`, data);
        //console.log(response);

        if(response.status === 201 || response.status ===200){
            //console.log('GET Cart data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }

    } catch(error) {
        console.error("Axios error in get Cart: ", error);
        return null;
    }
}

export const postCart = async data => {
    try{
        const response = await axios.post(`${BASE_URL}/Cart`, data);
        if(response.status === 201 || response.status ===200){
            //console.log('POST Cart data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }
    } catch (error){
        console.error("Axios error in post Cart: ", error);
        return null;
    }
}


export const deleteCart = async id => {
    try {
      const response = await axios.delete(`${BASE_URL}/Cart/${id}`);
      if (response.status === 204 || response.status === 200) {
        return { status: true };
      } else if (response.status === 401) {
        return { status: false };
      }
    } catch (error) {
      console.error('Error occurred while deleting CART:', error);
      return null;
    }
  };