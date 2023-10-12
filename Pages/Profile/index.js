import React, {useContext, useEffect, useState} from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './style.js'
import { AuthContext } from '../../Context/AuthContext.js';


const Profile = ({navigation}) => {
    const {userInfo, isLoading, logout} = useContext(AuthContext)
    
    const checkLogic = () => {
        
    }

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading}/>
            <ScrollView style={styles.scroll}>
                <TouchableOpacity
                    onPress={() => console.log('Doing...')}
                    style={styles.button}>
                    <Text style={styles.txtButton}>Change password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log('Doing...')}
                    style={styles.button}>
                    <Text style={styles.txtButton}>Change time between detect times</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log('Doing...')}
                    style={styles.button}>
                    <Text style={styles.txtButton}>Turn off the warning sound</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log('Doing...')}
                    style={styles.button}>
                    <Text style={styles.txtButton}>Turn on the notification light</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={logout}
                    style={styles.button}>
                    <Text style={styles.txtButton}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
            
        </View>
    )
    
}
export default Profile;
