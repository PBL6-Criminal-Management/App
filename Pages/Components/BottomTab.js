import React from "react";
import {StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../Home/index'
import Criminal from '../Criminal/index'
import FaceDetect from '../FaceDetect/index'
import Case from '../Case/index'
import Profile from '../Profile/index'
import { CustomText } from "./CustomText";

const Tab = createBottomTabNavigator()

const BottomTab = ({navigation}) => {
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false, 
                tabBarShowLabel: false,
                tabBarStyle:{
                    position: 'absolute',
                    elevation: 0,
                    backgroundColor: '#1E1E1E',
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6,
                    borderBottomLeftRadius: 26,
                    borderBottomRightRadius: 26,
                    height: '12%',
                    ... styles.shadow
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 3}}>
                            <Image
                                source={require('../../Public/home.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#386BF6' : 'white'
                                }}
                            />
                            <CustomText
                                style={{color: focused ? '#386BF6' : 'white', fontSize: 12}}>
                                    Trang chủ
                            </CustomText>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="Criminals" 
                component={Criminal}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 3}}>
                            <Image
                                source={require('../../Public/criminal.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#386BF6' : 'white'
                                }}
                            />
                            <CustomText
                                style={{color: focused ? '#386BF6' : 'white', fontSize: 12}}>
                                    Tội phạm
                            </CustomText>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="FaceDetect" 
                component={FaceDetect}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={require('../../Public/AI.png')}
                            resizeMode='contain'
                            style={{
                                width: 78,
                                height: 78
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TouchableOpacity
                                style={{
                                    top: -20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // ...styles.shadow
                                }}
                                onPress={props.onPress}
                            >
                                <View style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 100,
                                    backgroundColor: '#1E1E1E'
                                }}>
                                    {props.children}
                                </View>
                        </TouchableOpacity>
                    ),
                    tabBarStyle:{display:'none'}
                }}
            />
            <Tab.Screen 
                name="Cases" 
                component={Case}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 3}}>
                            <Image
                                source={require('../../Public/case.png')}
                                resizeMode='stretch'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#386BF6' : 'white'
                                }}
                            />
                            <CustomText
                                style={{color: focused ? '#386BF6' : 'white', fontSize: 12}}>
                                    Vụ án
                            </CustomText>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 3}}>
                            <Image
                                source={require('../../Public/profile.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#386BF6' : 'white'
                                }}
                            />
                            <CustomText
                                style={{color: focused ? '#386BF6' : 'white', fontSize: 12}}>
                                    Cá nhân
                            </CustomText>
                        </View>
                    )
                }}
            />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow:{
        shadowColor: '#7F5DF0',
        shadowOffset:{
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5


    }
})

export default BottomTab