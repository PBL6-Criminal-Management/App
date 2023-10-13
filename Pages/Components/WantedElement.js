import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import {CustomText} from '../Components/CustomText.js'

const WantedElement = (props) => {    
    const colorList = {'Bình thường':'#FBC778', 'Nguy hiểm':'#FC0808', 'Đặc biệt': '#63036C'}
    const BASE_PATH = '../../Public/'

    return (
        <View style={[styles.container, 
        {borderTopColor: colorList[props.item.wantedType]}
        ]}>
            <CustomText
                style={[styles.wantedType, {backgroundColor: colorList[props.item.wantedType]}]}>
                    {props.item.wantedType}
                    </CustomText>
            <View
                style={styles.body}>
                <Image 
                    style={styles.image}
                    source={props.item.image}
                />
                <View style={styles.textContainer}>
                    <CustomText 
                        style={{fontFamily:'Be Vietnam bold', color: 'black'}}>
                            {props.item.criminalName}
                        </CustomText>
                    
                    <View
                        style={styles.content}>
                        <CustomText>
                            Năm sinh: {props.item.birthday}
                        </CustomText>
                        <CustomText>
                            Tội danh: {props.item.charge}
                        </CustomText>
                        <CustomText>
                            Đặc điểm: {props.item.characteristic}
                        </CustomText>
                        <CustomText>
                            Vũ khí: {props.item.murderWeapon}
                        </CustomText>
                </View>
                </View>
                

            </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderWidth: 1,
        // borderStyle: 'dashed',
        borderRadius: 17,
        borderColor: '#8F9FBF',
        borderTopWidth: 4,
        padding: 8
    },
    wantedType: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 5,
        color: 'white',
        padding: 5,
        overflow: 'hidden'
    },
    body: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        width: 90,
        height: 90,
        borderWidth: 1,
        borderRadius: 100,
        alignSelf: 'center',
        resizeMode: 'stretch'
    },
    textContainer:{
        flex: 1
    },
    content: {
        paddingLeft: 20
    },
    foot: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    }
})

export default WantedElement;