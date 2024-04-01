import axios from "axios";

//서버 주소
import REACT_APP_SERVER_URL from '../../env'





// /getInfo에 GET 요청 보내기 
export const getInfos = async () => {
    try {
        const response = await axios.get(`${REACT_APP_SERVER_URL}/getInfo`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}

// /getColor에 GET 요청 보내기
export const getColors = async () => {
    try {
        const response = await axios.get(`${REACT_APP_SERVER_URL}/getColor`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}



//로그인 확인 / POST
export const fetchLogin = async (data) => {
    try {
        const response = await axios.post(`${REACT_APP_SERVER_URL}/fetchLogin`, data);
        console.log(response.data)
        return response.data; // 서버로부터 받은 데이터 리턴
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}