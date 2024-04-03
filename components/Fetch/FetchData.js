import axios from "axios";

//FireBase
import storage from './FireBaseStorage'
import { listAll, getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';

//서버 주소
import REACT_APP_SERVER_URL from '../../env'





//Mysql
//Mysql
//Mysql

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
        return response.data; // 서버로부터 받은 데이터 리턴
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}


//사용자 자산 로드 / POST
export const fetchUserAssets = async (data) => {
    try {
        const response = await axios.post(`${REACT_APP_SERVER_URL}/fetchUserAssets`, data);
        return response.data; // 서버로부터 받은 데이터 리턴
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}









//FireBase
//FireBase
//FireBase

//자산 이미지 로드  
export const fetchAssetsImages = async (data) => {
    const imageUrls = [];
    try {
        const storageRef = ref(storage, `/${data}`);
        const result = await listAll(storageRef);

        for (const item of result.items) {
            const url = await getDownloadURL(item);

            // 정규식을 사용하여 파일 이름에서 자산 ID와 이미지 번호를 추출
            const regex = /(\d+)_+(\d+)\.(jpg|jpeg|png)/;
            const match = item.name.match(regex);

            if (match) {
                const assetID = match[1]; // 첫 번째 그룹에는 자산 ID가 있습니다.
                const imageNumber = match[2]; // 두 번째 그룹에는 이미지 번호가 있습니다.

                imageUrls.push({ url, name: item.name, assetID: assetID, imageNumber: imageNumber});
            } else {
                console.log('파일 이름에서 자산 ID와 이미지 번호를 찾을 수 없습니다.');
            }

            
        }
    } catch (error) {
        console.error('이미지 로딩 오류:', error);
    }
    return imageUrls;
};

