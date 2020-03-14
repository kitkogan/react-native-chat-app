import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import io from 'socket.io-client';

//sets cuurrent state and current value of user entry
export default function HomeScreen() {
    const [messageToSend, setMessageToSend] = useState('');
  //allows to connect to app in browser at http address below
  useEffect(function(){
    // io("http://192.168.0.165:19006/");
    io("http://127.0.0.1:3001/");
  },[]);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TextInput 
          value={messageToSend} onChangeText={
          (text) => setMessageToSend(text)}
          placeholder="Enter chat message..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
