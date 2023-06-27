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