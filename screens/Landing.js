import React from 'react';
import {StyleSheet,Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-material-ui';
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
        padding: 150
    } ,
    logo:{
        alignSelf:'center',
    },
    
 });
class Landing extends React.Component {
   
    render (){
        return (
            <LinearGradient colors={['white','#094CA1']}  start={{x:0.5,y:0.7}} style={styles.body}>
                <Image style={styles.logo} source={
                    Logo
                } />
                <Button raised primary style={button} text='Sign In' onPress={()=>{
                    this.props.navigation.navigate('SignInPage')
                }}/>
            </LinearGradient>
        );
    };
};

export default Landing;