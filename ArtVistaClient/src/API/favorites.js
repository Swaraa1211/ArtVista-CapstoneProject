import axios from 'axios';
import { BASE_URL } from '../constant/endPoint';


export const getFavorites = async data => {
    // console.log(data);
    try{
        const response = await axios.get(`${BASE_URL}/Favorites`, data);
        //console.log(response);

        if(response.status === 201 || response.status ===200){
            //console.log('GET Favorites data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }

    } catch(error) {
        console.error("Axios error in get Favorites: ", error);
        return null;
    }
}

export const postFavorites = async data => {
  console.log(data.user_id + " in post fav");
  try{
    const dataString = JSON.stringify(data);
    console.log(dataString + " in post fav");
      const response = await axios.post(`${BASE_URL}/Favorites`, {userid: data.user_id, artid: data.art_id, users:null, art:null});
      if(response.status === 201 || response.status ===200){
          //console.log('POST Favorites data success', response.data);
          return {status: true, data: response.data};
      }
      else if(response.data === 401){
          return {status: false, data: response.data};

      }
  } catch (error){
      console.error("Axios error in post Favorites: ", error);
      return null;
  }
}

export const deleteFavorites = async id => {
    try {
      const response = await axios.delete(`${BASE_URL}/Favorites/${id}`);
      if (response.status === 204 || response.status === 200) {
        return { status: true };
      } else if (response.status === 401) {
        return { status: false };
      }
    } catch (error) {
      console.error('Error occurred while deleting Favorites:', error);
      return null;
    }
  };