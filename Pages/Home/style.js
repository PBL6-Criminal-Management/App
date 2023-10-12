import { StyleSheet } from 'react-native';
import color from '../../Contains/color'
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: 'white'
    },
    head:{
        flex: 1.2,
        paddingStart: 20,
        justifyContent: 'center'
    },
    title:{
        fontSize: 22,
        fontStyle: 'normal',
        opacity: 1,
        letterSpacing: 0.4
    },
    foot:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14
    }
});

export default styles;