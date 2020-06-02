import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, FlatList, TouchableHighlight, TextInput } from 'react-native';
import Meters from './utilities/Meters';
import { Checkbox, Button, IconToggle, Badge } from 'react-native-material-ui';
import AreaOffices from './utilities/AreaOffices';
import FilePickerManager from 'react-native-file-picker';
import { writeFile, readFile, exists } from 'react-native-fs';
import XLSX from 'xlsx';
class ViewMeters extends React.Component {
  state = {
    sortBy: [
      { opened: false, name: 'Area Offices', id: 1000001, value: AreaOffices },
      { opened: false, name: 'Meter Type', id: 1000002, value: [{ name: 'Single Phase', checked: false }, { name: 'Three Phase', checked: false }] },
      { opened: false, name: 'Reasons for uninstallation', id: 1000003, value: [{ name: 'Schedule not given', checked: false }, { name: 'Ongoing Installation', checked: false }, { name: 'Seperation required', checked: false }] },
      { opened: false, name: 'Installation status', id: 1000004, value: [{ name: 'Installed', checked: false }, { name: 'Uninstalled', checked: false }] }
    ],
    areaOffices: AreaOffices,
    metersToRender: Meters,
    opened: false,
    count: '',
    selectFile: false,
    file: { fileName: 'select file' }
  };


  selectedAreas = [];
  selectedMeters = [];
  handleOpen = (val) => {
    let sortBy = this.state.sortBy;
    this.state.sortBy.forEach((sort) => {
      if (sort.id === val) {
        let index = sortBy.indexOf(sort)
        sortBy[index].opened = !sortBy[index].opened;
        this.setState({ sortBy })
      }
    })
  }

  handleCheck = (item) => {
     item.checked=!item.checked; 
     let sortBy=this.state.sortBy;
     this.setState({sortBy});
     if(item.checked){
       this.setState((prev)=>{
        return{count:Number(prev.count)+1}
       })
     }else{this.setState((prev)=>{
      return{count:prev.count-1}
     })
   }
   setTimeout(()=>{console.log(this.state.count)},5)
  }
  
  handleCancel = () => {
    let unCheckedOffices = this.state.areaOffices;
    for (let i = 0; i < AreaOffices.length; i++) {
      unCheckedOffices[i].checked = false
    };
    this.selectedAreas = [];
    this.setState({ metersToRender: Meters, count: 0 });
    this.setState({ areaOffices: unCheckedOffices })
    console.log(this.state)

  }
  handleFilter = () => {
    if (this.state.count === '' || this.state.count === 0) {
      this.setState({ metersToRender: Meters, opened: false })
    } else {

      this.selectedMeters = []
      Meters.forEach((meter) => {
        if (this.selectedAreas.includes(meter.area)) {
          this.selectedMeters.push(meter)
        }
      });
      this.setState({ metersToRender: this.selectedMeters, opened: false })
      console.log(this.state.metersToRender, this.selectedAreas)
    }
  };

  handleSelectFile = () => {
    FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response, `filename=${response.fileName}`);

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
  handleDownload = () => {
    let data = this.state.metersToRender;
    let ws = XLSX.utils.json_to_sheet(data);
    const d = new Date();
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Schedule");

    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    let RNFS = require('react-native-fs');
    let file = RNFS.DownloadDirectoryPath + `/All Schedule.xlsx`;
    let count = 0;
    let checkFile = async (file) => {
      if (await exists(file)) {
        file;
        count++
        console.log(count)
        file = RNFS.DownloadDirectoryPath + `/All Schedule(${count}).xlsx`;
        checkFile(file)
      } else {
        writeFile(file, wbout, 'ascii')
          .then((r) => { console.log('file', wbout); alert('File Downloaded') })
          .catch((e) => { console.log(e) });
      }
    }
    checkFile(file)

  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={{ color: 'white', marginLeft: 100 }}>All Schedule</Text>,
      headerRight: <TouchableOpacity>
        <Text style={{ color: 'white', marginRight: 10 }}>First Name</Text>
      </TouchableOpacity>,
      headerStyle: {
        backgroundColor: '#094CA1',
      },
      headerLeft: <IconToggle onPress={() => { console.log('download pressed', navigation); navigation.state.params.handleDownload() }} style={{
        icon: { color: '#E8E8E8' }
      }} name='get-app' />
    }
  }
  componentDidMount = () => {
    this.props.navigation.setParams({
      handleDownload: this.handleDownload
    })
  }
  render() {


    const tagStyle = {
      borderRadius: 4,
      color: 'white',
      width: 125,
      paddingLeft: 20,
      fontWeight: 'bold'
    }
    const {
      handleOpen,
      handleCheck,
      handleCancel,
      handleFilter,
      handleSelectFile,
    } = this;
    const {
      count,
      sortBy,
      metersToRender,
      areaOffices,
      opened,
      selectFile
    } = this.state;

    return (
      //main view
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', position: 'absolute', top: 450, right: 20, zIndex: 1 }} onPress={() => { }}>
          {selectFile && <View style={{ flexDirection: 'row', backgroundColor: '#E8E8E8', height: 35, borderRadius: 25 }}>
            <Button onPress={handleSelectFile} text={this.state.file.fileName} />
          </View>}
          <IconToggle name='cloud-upload' size={40} onPress={() => { this.setState((prev) => { return { selectFile: !prev.selectFile } }) }} color='#094CA1' style={{
            container: { borderRadius: 50, backgroundColor: '#E8E8E8' }
          }} />
        </View>

        <View style={{
          margin: 10,
          alignSelf: "flex-end",
          zIndex: 1,
          position: "absolute",
          backgroundColor: '#E8E8E8',
          paddingLeft: 10,
          borderRadius: 10,
          maxHeight: 350,
          width: 240,


        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <TextInput style={{
              alignItems: 'center'
            }} placeholder='Search...' />
            <Badge style={{ container: { top: 5, right: 5 } }} text={count}>
              <IconToggle name='filter-list' onPress={() => {
                this.setState((prev) => {
                  return { opened: !prev.opened }
                })
              }} />
            </Badge>
          </View>
          {opened && <View style={{
            maxHeight: 300
          }}>
            <FlatList
              style={{
                margin: 1,
                paddingBottom: 10,
              }}
              data={sortBy}
              renderItem={({ item }) => (

                <ScrollView
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    // maxHeight:400,
                    padding: 10
                  }}>
                  <TouchableOpacity
                    onPress={() => { handleOpen(item.id) }}
                  >
                    <Text>{item.name}</Text></TouchableOpacity>
                  {item.opened && <FlatList
                    style={{
                      margin: 1,
                      paddingBottom: 10,
                    }}
                    data={item.value}
                    renderItem={({ item }) => (
                      <View
                        key={item.id}
                        style={{
                          flexDirection: "row",
                          height: 35,
                          padding: 0
                        }}
                      >
                        <Checkbox
                          style={{
                            height: 30,
                            position: 'relative',
                            alignSelf: 'center'
                          }}
                          label={item.name}
                          value={item.name}
                          checked={item.checked}
                          onCheck={() => {handleCheck(item)}} />
                      </View>
                    )}
                  />}
                </ScrollView>
              )}
            />



            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 70,
              paddingLeft: 10
            }}>
              <IconToggle onPress={handleCancel} name='cancel' />
              <Button onPress={handleFilter}
                text='Filter' />
            </View>
          </View>}
        </View>

        <View style={{
          flex: 1,
          zIndex: -1,
          alignSelf: 'center',
          marginTop: 70
        }}>

          <FlatList
            style={{
              backgroundColor: '#E8E8E8',
            }}
            data={metersToRender}
            renderItem={({ item }) => (

              <TouchableHighlight
                onPress={() => {
                  this.props.navigation.navigate('DetailsScreen', { item })
                }}
                style={{
                  backgroundColor: 'white',
                  width: 400,
                  height: 35,
                  margin: 1,
                  padding: 5,
                  justifyContent: "center"
                }} key={item.id}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <Text style={{ width: 90 }}>{item.meterNo}</Text>
                  <Text style={{ width: 90 }}>{item.phase}</Text>
                  {item.status === 'INSTALLED' ? <Text style={{ ...tagStyle, backgroundColor: '#00FF00' }}>{item.status}</Text> : <Text style={{ ...tagStyle, backgroundColor: '#FF0000' }}>{item.status}</Text>}

                </View>
              </TouchableHighlight>
            )}
          />



        </View>
      </View>
    );
  };
};
export default ViewMeters;