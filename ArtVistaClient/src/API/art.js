import axios from 'axios';
import { BASE_URL } from '../constant/endPoint';


export const getArt = async data => {
    // console.log(data);
    try{
        const response = await axios.get(`${BASE_URL}/Art`, data);
        //console.log(response);

        if(response.status === 201 || response.status ===200){
            //console.log('GET ART data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }

    } catch(error) {
        console.error("Axios error in get ART: ", error);
        return null;
    }
}

export const postArt = async data => {
    try{
        const response = await axios.post(`${BASE_URL}/Art`, data);
        if(response.status === 201 || response.status ===200){
            //console.log('POST ART data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }
    } catch (error){
        console.error("Axios error in post ART: ", error);
        return null;
    }
}

export const putArt = async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/Art/${id}`, data);
      if (response.status === 204 || response.status === 200) {
        return { status: true };
      } else if (response.status === 401) {
        return { status: false };
      }
    } catch (error) {
      console.error('Error occurred in put ART', error);
      return null;
    }
  };
  export const deleteArt = async id => {
    try {
      const response = await axios.delete(`${BASE_URL}/Art/${id}`);
      if (response.status === 204 || response.status === 200) {
        return { status: true };
      } else if (response.status === 401) {
        return { status: false };
      }
    } catch (error) {
      console.error('Error occurred while deleting ART:', error);
      return null;
    }
  };