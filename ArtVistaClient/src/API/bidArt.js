import axios from 'axios';
import { BASE_URL } from '../constant/endPoint';

export const getBidArt = async data => {
    // console.log(data);
    try{
        const response = await axios.get(`${BASE_URL}/BidArt`, data);
        //console.log(response);

        if(response.status === 201 || response.status ===200){
            //console.log('GET BID ART data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }

    } catch(error) {
        console.error("Axios error in get BID ART: ", error);
        return null;
    }
}

export const postBidArt = async data => {
    try{
        const response = await axios.post(`${BASE_URL}/BidArt`, data);
        if(response.status === 201 || response.status ===200){
            //console.log('POST BidArt data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }
    } catch (error){
        console.error("Axios error in post BidArt: ", error);
        return null;
    }
}

export const postBidPrice = async data => {
    try{
        const response = await axios.post(`${BASE_URL}/BidPrice`, data);
        if(response.status === 201 || response.status ===200){
            //console.log('POST BidArt data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }
    } catch (error){
        console.error("Axios error in post BidArt: ", error);
        return null;
    }
}

export const deleteBidArt = async id => {
    try {
      const response = await axios.delete(`${BASE_URL}/BidArt/${id}`);
      if (response.status === 204 || response.status === 200) {
        return { status: true };
      } else if (response.status === 401) {
        return { status: false };
      }
    } catch (error) {
      console.error('Error occurred while deleting BIDART:', error);
      return null;
    }
  };