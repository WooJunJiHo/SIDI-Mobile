import {
    View,
    Button,
} from 'react-native'




export const KakaoLogin = (props) => {
    return (
        <Button
            title='Kakao Login'
            onPress={() => Kakao.Auth.authorize()}
        />
    )
}