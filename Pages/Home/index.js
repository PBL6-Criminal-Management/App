import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from '../../Context/AuthContext.js';
import styles from './style.js'

const Home = ({navigation}) => {
    const {username} = useContext(AuthContext)

    const checkLogic = () => {
        
    }
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.title}>
                    Welcome back,
                </Text>
                <Text style={[styles.title, {color: '#8F9FBF'}]}>
                    {username}
                </Text>
            </View>
            <View style={styles.foot}>
            </View>
        </View>
    )
    
}
export default Home;
