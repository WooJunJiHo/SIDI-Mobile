import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import { useState } from 'react';

//아이콘
import Icon from '../components/styles/Icons';

//다크모드
import DarkMode from '../components/styles/DarkMode'


const Search = (props) => {
    //다크모드
    const [ui, setUI] = useState(false);

    //검색바
    const [search, setSearch] = useState('');

    //리스트
    const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);


    return (
        <SafeAreaView
            style={[
                ui != false ? DarkMode.lightPriceView : DarkMode.darkPriceView,
                {
                    flex: 1,
                }
            ]}
        >
            {/* 검색바 */}
            <View style={{ alignItems: 'center' }}>
                <View
                    style={[
                        ui != false ? DarkMode.lightTextInput : DarkMode.darkTextInput,
                        styles.searchSection
                    ]}
                >
                    <TouchableOpacity style={{ margin: 9, }}>
                        <Icon
                            style={styles.searchIcon}
                            name='search-outline'
                            size={24}
                            color='#767676'
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.searchTextInput}
                        value={search}
                        onChangeText={(e) => { setSearch(e) }}
                        placeholder='자산을 검색하세요'
                        placeholderTextColor='#767676'
                        color={ui != false ? '#111' : '#DBDBDB'}
                        multiline={false}
                        maxLength={100}
                    />
                </View>
            </View>

            {/* 자산 목록 */}

            <ScrollView>
                <View style={styles.listSection}>
                    {list.map((item, idx) => (
                        <TouchableOpacity
                            key={idx}
                            style={[styles.listView, { height: Dimensions.get('window').width / 3 }, ui != false ? DarkMode.lightTextInput : DarkMode.darkTextInput]}
                            onPress={() => {
                                props.navigation.navigate("SearchAssetsInfo")
                            }}
                        >

                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>


        </SafeAreaView>
    )
}


export default Search




const styles = StyleSheet.create({

    //검색바
    searchSection: {
        height: 42,
        width: '91%',
        marginTop: 35,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchTextInput: {
        flex: 1,
        paddingRight: 12,
    },


    //자산 목록
    listSection: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    listView: {
        width: '33.3%',
        borderWidth: 1,
    },
})