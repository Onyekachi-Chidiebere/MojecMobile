import React from 'react';
import {View,Text,Button,TextInput} from 'react-native';
class AddContact extends React.Component{
    static navigationOptions = {
        headerTitle:'Add Contacts',
    };
    state = {
        name:'',
        phone:'',
    }
    handleSubmit=()=>{
            this.props.screenProps.onSubmit(this.state);
            this.props.navigation.navigate('ContactPage');
    };
   
    updatePhone =(phone)=>{
        if(+ phone||phone===''||phone===null){
            return this.setState({phone})
        }
        
    };
    
    render(){
        return(
            <View>
                <TextInput placeholder="Name" onChangeText={(name)=>{this.setState({name})}} value={this.state.name}/>
                <TextInput keyboardType='numeric' placeholder="Phone" onChangeText={(phone)=>{this.updatePhone(phone)}} value={this.state.phone}/>
                <Button title='Add' onPress={this.handleSubmit}/>
                <Button title='Back' onPress={()=>{
                    this.props.navigation.navigate('ContactPage')
                }}/>
            </View>
        );
    };
    };
    

export default AddContact;