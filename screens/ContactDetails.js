import {Button,Text,View} from 'react-native';
import React from 'react'
class ContactDetails extends React.Component{
    static navigationOptions = ({navigation})=>{
        return {
            headerTitle: navigation.getParam('name')
        };
    };
    render(){
        return(
            <View>
                <Text>{this.props.navigation.getParam('phone')}</Text>
                <Button title='Go to Contacts' onPress={()=>{
                    this.props.navigation.navigate('ContactPage')
                }}/>          
            </View>
        );
    }
} ;
    
export default ContactDetails;