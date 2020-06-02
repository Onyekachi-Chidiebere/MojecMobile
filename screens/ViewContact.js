import React from 'react';
import {Text,Button,View,ScrollView,TextInput,TouchableOpacity} from 'react-native'
import Styles from '../styles/stylesheet'
 class ViewContact extends React.Component{
     static navigationOptions = {
         headerTitle:'Contacts',
     };
     state={
         Contact:this.props.screenProps.Contact,
     }
     static getDerivedStateFromProps(props, state) {
        if (props.screenProps.Contact !== state.Contact) {
          return {
            Contact:props.screenProps.Contact,
          };
        };
        return null;
      }
     
     handleDelete=(contactId)=>{
        this.props.screenProps.onDelete(contactId);
     };
     
     contactDetails=(contact)=>{
         console.log(contact,this.props.navigation.navigate)
         this.props.navigation.navigate('DetailsPage',{
            name:contact.name,
            phone:contact.phone
        });
    };
    searchContact=(contact)=>{
        this.props.screenProps.onSearch(contact);
    }
    render(){
        return(
            <View>

                <ScrollView>
                    
                    <TextInput placeholder='Search' onChangeText={(text)=>{this.searchContact(text)}} />
                     {this.state.Contact.map(contact =>{
                      return <TouchableOpacity style={Styles.blue} key = {contact.id} onPress={()=>{this.contactDetails(contact)}} >
                                <Text style={Styles.contact}>{contact.name}</Text>
                                <Text style={Styles.contact}>{contact.phone}</Text>
                                <Button title='Del' onPress={()=>{this.handleDelete(contact.id)}} />
                             </TouchableOpacity>
                        })}
                
              
                    <Button title='Add Contact' onPress={()=>{
                        this.props.navigation.navigate('AddContactPage')
                    }}/>
                    <Button title='goto SignIn' onPress={()=>{
                        this.props.navigation.navigate('SignInPage')
                    }}/>
                </ScrollView>
            </View>
            
        );
    };
};
export default ViewContact
        