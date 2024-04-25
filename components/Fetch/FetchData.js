import axios from "axios";

//FireBase
import storage from './FireBaseStorage'
import { listAll, getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';

//서버 주소
import { keys } from '../../env'





//Mysql
//Mysql
//Mysql

// /getInfo에 GET 요청 보내기 
export const getInfos = async () => {
    try {
        const response = await axios.get(`${keys.nodeURL}/getInfo`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}

// /getColor에 GET 요청 보내기
export const getColors = async () => {
    try {
        const response = await axios.get(`${keys.nodeURL}/getColor`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}

// /getScrapingAssets에 GET 요청 보내기
export const getScrapingAssets = async () => {
    try {
        const response = await axios.get(`${keys.nodeURL}/getScrapingAssets`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}



//로그인 확인 / POST
export const fetchLogin = async (data) => {
    try {
        const response = await axios.post(`${keys.nodeURL}/fetchLogin`, data);
        return response.data; // 서버로부터 받은 데이터 리턴
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}


//사용자 자산 로드 / POST
export const fetchUserAssets = async (data) => {
    try {
        const response = await axios.post(`${keys.nodeURL}/fetchUserAssets`, data);
        return response.data; // 서버로부터 받은 데이터 리턴
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}

//사용자 QR코드 자산 추가 / POST
export const fetchQR = async (data) => {
    try {
        const response = await axios.post(`${keys.nodeURL}/updateQR`, data);
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



//사용자 자산 이미지 업로드
export const updateAssetImage = async (uri, id, number, assetID) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const metadata = {
        contentType: 'image/jpeg',
    };

    // Firebase Storage의 참조를 만듭니다. 여기서 `ref`는 import한 함수를 사용합니다.
    const storageRef = ref(storage, `/${id}/${assetID}_${number}.jpeg`);
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // 진행 상태를 추적할 수 있음 (옵션)
        },
        (error) => {
            // 업로드 중 오류 처리
            console.log(error);
            alert('업로드 중 오류가 발생했습니다.');
        },
        () => {
            // 성공적으로 업로드된 경우 다운로드 URL을 가져옵니다.
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // 다운로드 URL을 이용한 후속 작업...
            }).catch((error) => {
                // 에러 처리
                console.error("다운로드 URL을 가져오는 중 오류 발생:", error);
            });
        }
    );
}