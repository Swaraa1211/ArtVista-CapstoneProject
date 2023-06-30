import axios from 'axios';
import { BASE_URL } from '../constant/endPoint';

export const getArtist = async data => {
    try{
        const response = await axios.get(`${BASE_URL}/ArtistPortfolio`, data);

        if(response.status === 201 || response.status === 200){
            console.log("Success in get ArtistPortfolio")
            return {status: true, data: response.data}
        }
        else if(response.status === 401){
            return {status:false, data: response.data}
        }

    }catch(error){
        console.log("error in get ArtistPortfolio fetch", error);
        return null;
    }
}

export const getArtistById = async id => {
  console.log("in api" +id);
  try {
    const response = await axios.get(`${BASE_URL}/ArtistPortfolio/${id}`);
    if (response.status === 201 || response.status === 200) {
      return { status: true, data: response.data };
    } else if (response.status === 401) {
      return { status: false, data: response.data };
    }
  } catch (error) {
    console.error('Error occurred ', error);
    return null;
  }
};

export const postArtistPortfolio = async data => {
    try{
        const response = await axios.post(`${BASE_URL}/ArtistPortfolio`, data);
        if(response.status === 201 || response.status ===200){
            //console.log('POST ArtistPortfolio data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }
    } catch (error){
        console.error("Axios error in post ArtistPortfolio: ", error);
        return null;
    }
}

export const putArtistPortfolio = async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/ArtistPortfolio/${id}`, data);
      if (response.status === 204 || response.status === 200) {
        return { status: true };
      } else if (response.status === 401) {
        return { status: false };
      }
    } catch (error) {
      console.error('Error occurred in put ArtistPortfolio', error);
      return null;
    }
  };
  export const deleteArtistPortfolio = async id => {
    try {
      const response = await axios.delete(`${BASE_URL}/ArtistPortfolio/${id}`);
      if (response.status === 204 || response.status === 200) {
        return { status: true };
      } else if (response.status === 401) {
        return { status: false };
      }
    } catch (error) {
      console.error('Error occurred while deleting ArtistPortfolio:', error);
      return null;
    }
  };