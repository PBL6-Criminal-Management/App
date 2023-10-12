import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { API_URL } from '../../Utils/constants.js'
import styles from './style.js'


const Camera = ({navigation}) => {
    // Cách tốt nhất
    fetch(API_URL+'getImage')
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                // setImage(base64data);
            };
        });

    return (
        <View style={styles.container}>
                <View style={styles.head}>
                    <Text style={styles.title}>
                    </Text>
                </View>
                <View style={styles.centerImage}>      
                    
                </View>
                <View style={styles.foot}>
                    <TouchableOpacity
                        style={styles.btnStartStop}
                    >
                        <Image 
                            style={[styles.image, {borderRadius: 10}]} 
                            // source={path}
                            >
                        </Image>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={
                            () => {
                                navigation.goBack()
                            }
                        }
                    >
                        <Image 
                            style={[styles.image, {borderRadius: 100}]} 
                            source={require('../../Public/cancel.png')}>
                        </Image>
                    </TouchableOpacity>
                </View>
        </View>
    )
    
}
export default Camera;

