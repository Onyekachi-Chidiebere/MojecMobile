import React from 'react';
import {View,Text} from 'react-native';
const row ={
    flexDirection:'row',
    justifyContent:'space-between'
}
const variable={
    width:60
}
const status={
    margin:1,
    paddingLeft:10,
    borderRadius:5,
    width:255,
    color:'white',
    fontWeight:'bold'
}
const content={
    width:255,
    backgroundColor:'#EBEBEB',
    margin:1,
    paddingLeft:10,
    borderRadius:5
}
class MeterDetails extends React.Component {
    static navigationOptions =({navigation})=>{
        return{
            headerTitle:<Text style={{color:'white',alignSelf:'center'}}>{navigation.getParam('item').meterNo}</Text>,
            headerStyle:{
            backgroundColor:'#094CA1',
            },
        };
    }
    render(){
        return(
            <View style={{flex:1,padding:25}}>
                <View style={{backgroundColor:'white',borderRadius:15,padding:15}}>
                    <Text style={{alignSelf:'center'}}>Customer Information</Text>
                    <View style={{...row}}>
                        <Text style={{...variable}}>Name</Text>
                        <Text style={{...content}}>{this.props.navigation.getParam('item').name}</Text>
                    </View>
                    <View style={{...row}}>
                        <Text style={{...variable}}>Phone</Text>
                        <Text style={{...content}}>{this.props.navigation.getParam('item').phone}</Text>
                    </View>
                    <View style={{...row}}>
                        <Text style={{...variable}}>Area</Text>
                        <Text style={{...content}}>{this.props.navigation.getParam('item').area}</Text>
                    </View>
                    <View style={{...row}}>
                        <Text style={{...variable}}>Address</Text>
                        <Text style={{...content}}>{this.props.navigation.getParam('item').address}</Text>
                    </View>
                    <View style={{...row}}>
                        <Text style={{...variable}}>Type</Text>
                        <Text style={{...content}}>{this.props.navigation.getParam('item').phase}</Text>
                    </View>
                    <View style={{...row}}>
                        <Text style={{...variable}}>Status</Text>
                        {this.props.navigation.getParam('item').status==='INSTALLED'?<Text style={{...status,backgroundColor:'#00FF00'}}>{this.props.navigation.getParam('item').status}</Text>:<Text style={{...status,backgroundColor:'#FF0000'}}>{this.props.navigation.getParam('item').status}</Text>}
                        
                    </View>
                    
                </View>
            </View>
        );
    };
};
export default MeterDetails;