import React, {useEffect, useState, useRef} from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import JoinScreen from './JoinScreen';

//sets current state and current value of user entry
export default function HomeScreen() {
    const [recvMessages, setRecvMessages] = useState([]);
    const [hasJoined, setHasJoined] = useState(false);
    const socket = useRef(null);

  //allows to connect to app at http address below
  useEffect(() => {
    // io("http://192.168.0.165:19006/");
    socket.current = io("http://127.0.0.1:3001/");
    socket.current.on('message', message => {
        setRecvMessages(prevState => GiftedChat.append(prevState, message));
    });
  },[]);

  //when a message is sent, socket emits the current message id and text
  //GiftedChat takes the previous state and sets the recieved message state using prev state and messages
  const onSend = messages => {
    socket.current.emit('message', messages[0].text);
    setRecvMessages(prevState => GiftedChat.append(prevState, messages));
  };

  //socket listens for the username for someone new joining the chat
  //state of joined users set to true
  const joinChat = username => {
    socket.current.emit('join', username);
    setHasJoined(true);
  };
  //conditional rendering tells GiftedChat what to do when someone has joined
  return (
    <View style={{flex: 1}}>
        {hasJoined ? (
          <GiftedChat
          renderUsernameOnMessage
          messages={recvMessages}
          onSend={messages => onSend(messages)}
          user={{
              _id: 1,
          }}
      />
        ) : (
          <JoinScreen joinChat={joinChat}/>
        )}
        {
            Platform.OS === 'android' && <KeyboardAvoidingView behavior='padding' />
        }
    </View>
  );
}

