import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';
import {Button} from 'react-native-material-ui'


const Logo = require('../images/logo.png');
const button = {
    container:{
        width:200,
        alignSelf:'center',
        borderRadius:25,
        backgroundColor:'white',
    },
    text:{
        color:'#094CA1'
    }
    

}
const styles = StyleSheet.create({
    body:{
        justifyContent:"space-between",
        flex:1,
        paddingTop: 50,
        paddingBottom:150,
        paddingLeft:50,
        paddingRight:50,
    } ,
    logo:{
        alignSelf:'center',
    },
    textInput:{
        color:'#094CA1',
        borderStyle:'solid',
        borderBottomColor:'#094CA1',
        borderBottomWidth:1,
        width:300

    },
    text:{
        color:'#094CA1',
        fontStyle:'italic'
    },
  
 });
class PasswordReset extends React.Component {
    
    render(){
        return(
            <LinearGradient colors={['white','#094CA1']}  start={{x:0.5,y:0.7}} style={styles.body}>
                <Image style={styles.logo} source={
                Logo
                 } />
                <TextInput style={styles.textInput} placeholder='Password'/>
                <TextInput style={styles.textInput} placeholder='Confirm Password'/>
                <Button raised primary style={button} text='reset Password'/>
            </LinearGradient>
  
        );
    };
};

export default PasswordReset;