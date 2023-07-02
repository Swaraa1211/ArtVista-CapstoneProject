import axios from 'axios';
import {BASE_URL} from '../constant/endPoint';

export const getUsers = async data => {
    // console.log(data);
    try{
        const response = await axios.get(`${BASE_URL}/Users`, data);
        //console.log(response);

        if(response.status === 201 || response.status ===200){
            //console.log('GET Users data success', response.data);
            return {status: true, data: response.data};
        }
        else if(response.data === 401){
            return {status: false, data: response.data};

        }

    } catch(error) {
        console.error("Axios error in get Users: ", error);
        return null;
    }
}

export const Signup = async data => {
    console.log(data);
    try{
        const response = await axios.post(`${BASE_URL}/Users`, data);
        console.log(response);
        

        if(response.status === 201 || response.status===200){

            console.log('Successful SignUp', response.data);
            return {status:true, data: response.data};
        }
        else if(response.status === 401){
            return{status: false, data:response.data};
        }
    } catch(error){
        console.error("Axios Error occurred while signing up:", error);
    return null; 
    }
}

export const Login = async data =>{
    console.log(data);
    try{
        const response = await axios.post(`${BASE_URL}/Users/Login`, data);

        if(response.status === 200){
            console.log('Successful Signup');
            return {status: true, data: response.data};
        }
        else if(response.status === 401){
            return {status: false, data: response.data};
        }

    } catch(error){
        console.error('Error', error);
        return null;
    }
}