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
export const getInfos = async (data) => {
    try {
        const response = await axios.post(`${keys.nodeURL}/getInfo`, data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}


// 지원 가능 자산 로드
export const getModelList = async () => {
    try {
        const response = await axios.get(`${keys.nodeURL}/getModelList`);
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

//자산 추가
export const addAsset = async (data) => {
    try {
        const response = await axios.post(`${keys.nodeURL}/addAsset`, data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}


//자산 삭제
export const deleteAsset = async (data) => {
    try {
        const response = await axios.post(`${keys.nodeURL}/deleteAsset`, data);
        return response.data;
    } catch (error) {
        console.log('Error:', error)
        throw error;
    }
}








//flask
//flask
//flask

export const uploadImage = async (img) => {
    const formData = new FormData();
    formData.append('photo', {
        uri: img,
        type: 'image/jpeg', // 변경 가능
        name: 'photo.jpg',
    });

    try {
        const response = await fetch(`${keys.flaskURL}/imageUpload`, {
            method: 'POST', // POST 요청 설정
            body: formData
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // 서버 응답을 JSON으로 파싱
        return data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error; // 예외를 다시 던져서 호출하는 쪽에서 처리할 수 있도록 함
    }
}



// 서버로부터 이미지를 색상 패치
export const fetchColor = async (imageData) => {
    try {
        const response = await fetch(`${keys.flaskURL}/color`, {
            method: 'POST', // POST 요청 설정
            headers: {
                'Content-Type': 'application/json' // JSON 형식의 데이터 전송
            },
            body: JSON.stringify(imageData) // 빈 객체를 JSON 문자열로 변환하여 전송 (필요에 따라 데이터 추가 가능)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // 서버 응답을 JSON으로 파싱
        return data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error; // 예외를 다시 던져서 호출하는 쪽에서 처리할 수 있도록 함
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

                imageUrls.push({ url, name: item.name, assetID: assetID, imageNumber: imageNumber });
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







//kakao
//kakao
//kakao

export const fetchLocation = async (data) => {
    try {
        const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?y=${data.coords.latitude}&x=${data.coords.longitude}`, {
            headers: {
                Authorization: `KakaoAK ${keys.kakaoApi}`,
            },
        });
        return response.data.documents[0].road_address ? response.data.documents[0].road_address : response.data.documents[0].address;

    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchReLocation = async (data) => {
    // 한글 주소를 인코딩
    const query = encodeURIComponent(data);

    try {
        const response = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${query}`, {
            headers: {
                Authorization: `KakaoAK ${keys.kakaoApi}`,
            },
        })
        console.log(response.data.documents[0])
    } catch (error) {
        console.log(error)
        throw error
    }
}





//GPT
//GPT
//GPT

export const gptContent = async (asset) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                messages: [
                    {
                        role: 'system', 
                        content:
                            `
                                역할: 상품에 대한 정보를 보고 판매글을 만들어줘.
                                주의사항: 
                                1. 2~3줄 사이로 짧고 간결하게 작성돼야 해. 
                                2. 거짓 또는 부풀린 설명이 있어서는 안돼.
                                3. 상세 설명이 있어야 하며 예시 같은 글이 있어야한다.
                                4. 상품 데이터에 포함 되어 있지 않는 것은 넣지 마.
                                [에시]
                                예민하신 분 거래 피해주시길 바랍니다 
                                기스, 찍힘 모두 존재하며 사진 참고 바랍니다 
                                
                                자급제이며 사설 수리 내역 없습니다 
                                트루톤, 스피커, 음향, 페•아 등등 모두 정상 작동합니다 
                                
                                케이스 끼우고 다녀서 불편함없이 사용하였습니다 
                            `,
                    },

                    { role: 'user', content: JSON.stringify(asset) },
                ],
                max_tokens: 2000,
                model: 'gpt-3.5-turbo'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${keys.openAiApi}`,
                }
            }
        )

        // 응답이 없는 경우 재시도를 위해 null 반환
        if (!response.data.choices || response.data.choices.length === 0) {
            return null;
        }

        try {
            // 데이터를 파싱하여 점수와 평가를 추출합니다.
            const content = response.data.choices[0].message.content;

            console.log(`회사: ${asset.COMPANY}\n모델: ${asset.MODEL + ' ' + asset.MORE}\n색상: ${asset.COLOR}\n상태: ${asset.CONDITIONS}\n제품 설명: ${content}\n추가 사항: `)
            return `회사: ${asset.COMPANY}\n모델: ${asset.MODEL + ' ' + asset.MORE}\n색상: ${asset.COLOR}\n상태: ${asset.CONDITIONS}\n제품 설명: ${content}\n추가 사항: `
        } catch (error) {
            console.error('GPT error:', error)
            return null;
        }

    } catch (error) {
        console.error('Error text: ', error)
        return null;
    }
}