import React from 'react';
import {View,Text,TouchableOpacity,TextInput,FlatList} from 'react-native';
import {Badge,IconToggle,Checkbox,Button} from 'react-native-material-ui';
import AreaOffices from './utilities/AreaOffices';
import Meters from './utilities/Meters'
class Home extends React.Component {
    state={
        metersToRender:Meters,
        areaOffices:AreaOffices,
        selectedItems:[],
        opened:false,
    };
      
    
    static navigationOptions={
       
        headerRight:<TouchableOpacity>
                        <Text style={{color:'white',marginRight:10}}>First Name</Text>
                    </TouchableOpacity>,
        headerStyle:{
            backgroundColor:'#094CA1',
        }
    };
  selectedAreas=[];
  selectedAreas=[];
    selectedMeters=[];
    handleCheck=(area)=>{
      let filteredOffices=this.state.areaOffices; 
      this.state.areaOffices.forEach((areaOffice)=>{
        if(areaOffice.id===area){
          if(this.selectedAreas.includes(areaOffice.name.toUpperCase())){
            this.selectedAreas=this.selectedAreas.filter((areas)=>{
              return areas!==areaOffice.name.toUpperCase()
            })
            this.setState({count:this.selectedAreas.length})

          }else{this.selectedAreas.push(areaOffice.name.toUpperCase())
             this.setState({count:this.selectedAreas.length})
          } 
          let index=filteredOffices.indexOf(areaOffice)
            filteredOffices[index].checked=!filteredOffices[index].checked
          this.setState({areaOffices:filteredOffices})
        }
      })

      setTimeout(()=>{console.log(this.state)},500)
    }
    handleCancel=()=>{
      let unCheckedOffices=this.state.areaOffices;
      for(let i=0;i < AreaOffices.length; i++){
        unCheckedOffices[i].checked = false
      };
      this.selectedAreas=[];
      this.setState({metersToRender:Meters,count:0});
      this.setState({areaOffices:unCheckedOffices})
      console.log(this.state)

    }
   handleFilter=()=>{
     if(this.state.count===''||this.state.count===0){
       this.setState({metersToRender:Meters,opened:false}) 
      }else{

    this.selectedMeters=[]
    Meters.forEach((meter)=>{
      if(this.selectedAreas.includes(meter.area)){
        this.selectedMeters.push(meter)
      }
    });
    this.setState({metersToRender:this.selectedMeters,opened:false})
    console.log(this.state,this.selectedAreas)}
   }
    render(){
        const { 
            areaOffices,
            opened
        } = this.state;
       
        const {handleCancel,handleCheck,handleFilter}=this
    const totalMeters=this.state.metersToRender.length
    const totalInstalled=this.state.metersToRender.filter((meter)=>{return meter.status==='INSTALLED'}).length
    const totalUninstalled=this.state.metersToRender.filter((meter)=>{return meter.status==='UNINSTALLED'}).length
    const singlePhase=this.state.metersToRender.filter((meter)=>{return meter.phase==='1 Phase'}).length
    const singlePhaseInstalled=this.state.metersToRender.filter((meter)=>{return meter.phase==='1 Phase'&& meter.status==='INSTALLED'}).length
    const singlePhaseUninstalled=this.state.metersToRender.filter((meter)=>{return meter.phase==='1 Phase'&& meter.status==='UNINSTALLED'}).length
    const threePhase=this.state.metersToRender.filter((meter)=>{return meter.phase==='3 Phase'}).length
    const threePhaseInstalled=this.state.metersToRender.filter((meter)=>{return meter.phase==='3 Phase'&& meter.status==='INSTALLED'}).length
    const threePhaseUninstalled=this.state.metersToRender.filter((meter)=>{return meter.phase==='3 Phase'&& meter.status==='UNINSTALLED'}).length
     
        return(
            <View style={{flex:1,backgroundColor:'white',padding:9}}>

                 <View style={{
                    margin:10,
                    alignSelf:"flex-end",
                    zIndex:1,
                    position:"absolute",
                    backgroundColor:'#E8E8E8',
                    paddingLeft:10,
                    borderRadius:10,
                    maxHeight:350,
                    width:240,


              }}>
                 <View style={{
                   flexDirection:'row',
                   justifyContent:'space-between'
                 }}>
                 <TextInput style={{
                  alignItems:'center'
                 }} placeholder='Search...'/>
                 <Badge style={{ container: { top:5, right: 5 } }} text={this.selectedAreas.length}>
                 <IconToggle name='filter-list' onPress={()=>{
                    this.setState((prev)=>{
                      return {opened:!prev.opened}
                    })
                 }}/>
                 </Badge>
                 </View>
                 {opened && <View style={{
                   maxHeight:300
                 }}> 
                 <FlatList
                    style={{
                    margin:1,
                    paddingBottom:10,
                    }}
                    data={areaOffices}
                    renderItem={({item})=>(
                        
                            <View 
                            key={item.id}
                            style={{
                              flexDirection:"row",
                              height:35,
                              padding:10
                            }}>
                              <Checkbox  style={{
                                height:30,
                                position:'relative',
                                alignSelf:'center'
                              }}
                              label={item.name}
                              value={item.name}
                              checked={item.checked}
                              onCheck={()=>{handleCheck(item.id)}}/>
                            </View>
                    )}
                />
                <View style={{
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'space-between',
                  paddingRight:70,
                  paddingLeft:10
                  }}>
                  <IconToggle onPress={handleCancel} name='cancel'/>
                  <Button onPress={handleFilter}
                   text='Filter'/>
                </View>
                </View>            }
              </View>    

                <View style={{
                    position:'absolute',
                    zIndex:0,
                    marginTop:80,
                    alignSelf:'center'
                }}>
                    <View style={{
                    padding:20,
                    height:100,
                    alignItems:'center',
                    width:400,
                    backgroundColor:'#9900FF',
                    }}>
                        <Text style={{color:'white',fontWeight:'bold'}}>{`ALL SCHEDULE: ${totalMeters}`}</Text>
                        <Text style={{color:'white',fontWeight:'bold'}}>{`INSTALLED: ${totalInstalled}`}</Text>
                        <Text style={{color:'white',fontWeight:'bold'}}>{`UNINSTALLED: ${totalUninstalled}`}</Text>
                    </View>
                    <View style={{
                        width:400,
                        height:100,
                        marginTop:3,
                        justifyContent:"space-between",
                        flexDirection:'row'
                    }}>
                        <View style={{
                            backgroundColor:'#99C399',
                            width:198,
                            alignItems:'center',
                            paddingTop:15,
                            

                        }}>
                            <Text style={{color:'white',fontWeight:'bold'}}>{`1Q: ${singlePhase}`}</Text>
                            <Text style={{color:'white',fontWeight:'bold'}}>{`INSTALLED: ${singlePhaseInstalled}`}</Text>
                            <Text style={{color:'white',fontWeight:'bold'}}>{`UNINSTALLED: ${singlePhaseUninstalled}`}</Text>
                        </View>
                        <View style={{
                            width:198,
                            backgroundColor:'#FF0000',
                            alignItems:'center',
                            paddingTop:15
                        }}>
                            <Text style={{color:'white',fontWeight:'bold'}}>{`3Q: ${threePhase}`}</Text>
                            <Text style={{color:'white',fontWeight:'bold'}}>{`INSTALLED: ${threePhaseInstalled}`}</Text>
                            <Text style={{color:'white',fontWeight:'bold'}}>{`UNINSTALLED: ${threePhaseUninstalled}`}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
};
export default Home;