import React from 'react';
import {View,Text,TouchableOpacity, Button} from 'react-native';
import {Checkbox,Toolbar,RadioButton} from 'react-native-material-ui';
import FilePickerManager from 'react-native-file-picker'
class Users extends React.Component {
    state={
        checked:'checked',
        file:''
    }
    static navigationOptions={
        headerRight:<TouchableOpacity>
                        <Text style={{color:'white',marginRight:10}}>First Name</Text>
                    </TouchableOpacity>,
        headerStyle:{
            backgroundColor:'#094CA1',
        }
    }
    handleSelect=()=>{
        FilePickerManager.showFilePicker(null, (response) => {
            console.log('Response = ', response);
           
            if (response.didCancel) {
              console.log('User cancelled file picker');
            }
            else if (response.error) {
              console.log('FilePickerManager Error: ', response.error);
            }
            else {
              this.setState({
                file: response
              });
            }
          });
    }
    render(){

        return (
            <View>
                <Text>This is Users</Text>
                <Button title='Select file' onPress={this.handleSelect}/>
            </View>

        );
    };
};  
export default Users;