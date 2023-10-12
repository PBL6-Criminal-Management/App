import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    title:{
      fontSize: 40,
      fontStyle: 'normal',
      textAlign: 'center'
    },
    scroll: {
      marginTop: 50
    },
    button:{
      backgroundColor: '#41fca3',
      borderWidth: 1,
      borderRadius: 12,
      width: '90%',
      height: 52,
      alignSelf: 'center',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    txtButton:{
      color: 'black',
      fontSize: 18
    }
});

export default styles;