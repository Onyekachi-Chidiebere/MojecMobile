import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
class Notifications extends React.Component {
    static navigationOptions={
        headerRight:<TouchableOpacity>
                        <Text style={{color:'white',marginRight:10}}>First Name</Text>
                    </TouchableOpacity>,
        headerStyle:{
            backgroundColor:'#094CA1',
        }
    }
    render(){
        return(
            <View>
                <Text>This is Notifications</Text>
            </View>
        );
    };
};
export default Notifications;