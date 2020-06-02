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
    touchableOpacity:{
      alignSelf:'flex-end',  
    }
    
 });
class SignIn extends React.Component {
    
    render(){
        return(
            <LinearGradient colors={['white','#094CA1']}  start={{x:0.5,y:0.7}} style={styles.body}>
                <Image style={styles.logo} source={
                Logo
                 } />
                <TextInput style={styles.textInput} placeholder='E-mail'/>
                <TextInput style={styles.textInput} placeholder='Password'/>
                <TouchableOpacity style={styles.touchableOpacity} onPress={()=>{
                    this.props.navigation.navigate('PasswordResetPage')
                }}>
                    <Text style={styles.text}>forgot password?</Text>
                </TouchableOpacity>
                <Button raised primary style={button} text='Sign In' onPress={()=>{
                    this.props.navigation.navigate('Main')
                }}/>
            </LinearGradient>
  
        );
    };
};

export default SignIn;