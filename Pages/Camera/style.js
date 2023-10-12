import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    head:{
        flex: 1.2,
        alignItems: 'center'
    },
    title:{
        fontSize: 16,
        color: 'white',
        opacity: 1,
        letterSpacing: 0.4,
        paddingHorizontal: 7,
        backgroundColor: '#466cb6',
        borderRadius: 5,
        marginTop: 50,
        overflow: 'hidden'
    },
    centerImage:{
      flex: 3.6,
      justifyContent: 'center'
    },
    background:{
      width: '100%',
      height: '80%',
    },
    image:{
      width: 35,
      height: 35,
      tintColor:'white'
    },
    foot:{
      flex: 1.2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14
    },
    btnStartStop:{
      width: 70,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#8F9FBF',
      borderRadius: 17
    },
    btnCancel:{
      width: 70,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
      opacity: 0.45,
      borderRadius: 100
    }
});

export default styles;