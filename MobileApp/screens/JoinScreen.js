import React, {useState} from 'react';
import {View, Button, TextInput, Image} from 'react-native';

export default function JoinScreen({joinChat}) {
    const [username, setUsername] = useState('');
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>             
        <Image resizeMode="contain" style={{flex: 1}} source={require('../assets/chat.png')} />
        <View style={{flex: 1, justifyContent: "space-around"}}>
            <TextInput onChangeText={text => setUsername(text)} value={username}placeholder="Enter Username" />
            <Button title="Join Chat" onPress={() => joinChat(username)}/>
           </View> 
        </View>
    );
}