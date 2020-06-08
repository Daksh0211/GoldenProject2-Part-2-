import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
//import MyHeader from '../components/MyHeader'

export default class TableScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      day:"",
      ToDo_list:""
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest =(day,ToDo_list)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('table_data').add({
        "user_id": userId,
        "day":day,
        "ToDo_list":ToDo_list,
    })

    this.setState({
        day :'',
        ToDo_list : ''
    })

    return Alert.alert("Today's list updated")
  }


  render(){
    return(
        <View style={{flex:1}}>
          <MyHeader title="Create a day's to-do list"/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter day"}
                onChangeText={(text)=>{
                    this.setState({
                        day:text
                    })
                }}
                value={this.state.day}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Enter your list details"}
                onChangeText ={(text)=>{
                    this.setState({
                        ToDo_list:text
                    })
                }}
                value ={this.state.ToDo_list}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.day,this.state.ToDo_list)}}
                >
                <Text>Enter</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)