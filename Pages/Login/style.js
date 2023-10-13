import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#152259'
    },
    waitingCircle:{
      position: 'absolute',
      top: 0, 
      left: 0, 
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    form:{
      flex: 0.8,
      backgroundColor: 'white',
      borderRadius: 20
    },
    head:{
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '70%'
    },
    title:{
        fontSize: 45,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        color:'#152259',
        opacity: 1,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    subtitle:{       
        fontFamily: 'Be Vietnam italic', 
        fontSize: 15,
        height: 20,
        alignSelf: 'flex-end'
    },    
    body:{
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: '5%',
        gap: 14
    },    
    textInput: {
      width: '100%', 
      alignItems: 'center', 
      flexDirection: 'row'
    },
    input: {
      height: 50,
      flexBasis: '1%', //fix input width
      flexGrow: 1, //fill the remaining space.
      borderWidth: 1,
      borderColor: '#43BDD4',
      borderRadius: 10,
      padding: 10,
      paddingRight: 38,
      marginLeft: 10
    },
    icon: {
      position: 'absolute',
      right: 7,
      padding: 5
    },
    btnLogin:{
      borderRadius: 5,
      backgroundColor: '#152259',
      width: 246,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center'
    },
    txtLogin:{
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    foot:{
      flex: 0.1,
      alignItems: 'center',
      justifyContent: 'flex-start'
    }
});

export default styles;