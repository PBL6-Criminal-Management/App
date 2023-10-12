import React, {useContext, useState, useEffect} from 'react';
import { Linking, View, TouchableOpacity, TextInput, ActivityIndicator, Image, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import styles from './style.js'
import {CustomText} from '../Components/CustomText.js'
import { AuthContext } from '../../Context/AuthContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Main = () => {    
    const {isLoading, login} = useContext(AuthContext)

    const [username, SetUsername] = useState('')
    const [password, SetPassword] = useState('')
    const [showPwd, SetShowPwd] = useState(false);
    const [message, SetMessage] = useState('');
    const [isRememberLogin, SetRememberLogin] = useState(false);

    useEffect(() => {
        fetchData = async () => {
            let isRememberLogin = await AsyncStorage.getItem('isRememberLogin')

            if(isRememberLogin == null || isRememberLogin.toLowerCase() == 'false')
                SetRememberLogin(false)
            else
                SetRememberLogin(true)
        }
        fetchData()
    }, [])

    const checkLogic = () => {
        if(username === '' || password === ''){
            SetMessage('Tên đăng nhập hoặc mật khẩu không được để trống')
            return false
        }
        return true            
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>            
                {
                    isLoading && (
                        <View style={styles.waitingCircle}>
                            <ActivityIndicator size="large" color="black"/>
                        </View>
                    )
                }
                <View style={styles.head}>
                    <CustomText style={styles.title}>
                        Quản lý{'\n'}tội phạm
                    </CustomText>
                    <CustomText style={styles.subtitle}>
                        CA Quảng Nam
                    </CustomText>
                </View>            
                <View style={styles.body}>
                    <View style={styles.textInput}>
                        <CustomText style={{ width: '34%' }}>
                            Tên đăng nhập:
                        </CustomText>
                        <TextInput               
                            key="username"
                            name="user"
                            style={styles.input}
                            placeholder='Tên đăng nhập'
                            value={username}
                            onChangeText={SetUsername}>
                        </TextInput>
                    </View>
                    <View style={styles.textInput}>
                        <CustomText style={{ width: '34%' }}>
                            Mật khẩu:
                        </CustomText>
                        <TextInput                        
                            key="password"
                            name="pwd"
                            style={styles.input}
                            placeholder='Mật khẩu'
                            value={password}
                            onChangeText={SetPassword}
                            secureTextEntry={!showPwd}>
                        </TextInput>
                        <Pressable
                            style={styles.icon}                         
                            onPress={() => {
                                SetShowPwd(!showPwd)
                            }}
                        >
                            <Image 
                                source={showPwd? require('../../Public/showPwd.png') : require('../../Public/hidePwd.png')}
                            />
                        </Pressable>
                        
                    </View> 
                    {
                        message && <CustomText style={{ color: 'red', alignSelf: 'flex-start' }}>
                            {message}
                        </CustomText>   
                    }            
                    <View style={{flexDirection: 'row', alignSelf: 'flex-start', marginStart: '34%', paddingStart: 10}}>
                        <Checkbox
                            value={isRememberLogin}
                            onValueChange={SetRememberLogin}
                            style={{ borderColor: '#DFE0E2', borderRadius: 3 }}
                        />
                        <CustomText>{' '}Ghi nhớ đăng nhập</CustomText>
                    </View>
                    <View style={{ gap: 14 }}>                    
                        <TouchableOpacity
                            onPress={
                                async () => {
                                    if(checkLogic())
                                        SetMessage(await login(username, password, isRememberLogin))
                                }
                            }
                            style={styles.btnLogin}
                        >
                            <CustomText style={styles.txtLogin}>Đăng nhập</CustomText>
                        </TouchableOpacity>
                        <CustomText style={{color: '#53B6ED', textDecorationLine: 'underline', alignSelf: 'flex-end'}}
                            onPress={() => Linking.openURL('https://www.google.com/search?q=qu%C3%AAn+m%E1%BA%ADt+kh%E1%BA%A9u+th%C3%AC+ph%E1%BA%A3i+l%C3%A0m+sao')}>Quên mật khẩu?
                        </CustomText>                        
                    </View>
                </View>
                <View style={styles.foot}>
                    <CustomText>
                        Cần sự giúp đỡ? Liên hệ{' '}
                        <CustomText style={style={color: '#53B6ED', textDecorationLine: 'underline'}}
                            onPress={() => Linking.openURL('https://www.facebook.com/maeveofmay')}>Thanh Nhàn
                        </CustomText>
                    </CustomText>
                </View>
            </View>
        </View>
    )
    
}
export default Main;
