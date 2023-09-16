import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import {collection, onSnapshot, addDoc, serverTimestamp, orderBy, query, updateDoc, doc} from 'firebase/firestore'
import { db } from '../firebase'
import IncomingMessage from './IncomingMessage'
import SentMessage from './SentMessage'


const ChatView = ({ currentConversation, user }) => {

  const [newTitle, setNewTitle] = useState(currentConversation.name)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    setNewTitle(currentConversation.name)
  }, [currentConversation])

  const updateChatTitle = async e => {
    e.preventDefault()

    const chatRef = doc(db, 'messages', currentConversation.id)

    if(newTitle){
      await updateDoc(chatRef, {
        name: newTitle
      })
    }
  }



  useEffect(() => {
    if(currentConversation){
    const q = query(
      collection(db, 'messages', currentConversation.id, 'messageHistory'),
      orderBy('timestamp', 'desc'),
    )

    const unsubscribe = onSnapshot(q, snapshot => {
      const tempMessages = []

      snapshot.forEach(doc => {
        tempMessages.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setMessages(tempMessages)
    })

    return () => unsubscribe
    }
  }, [currentConversation])


const sendMessage = async e => {
  e.preventDefault()

  if(newMessage){
    await addDoc(
      collection(db, 'messages', currentConversation.id, 'messageHistory'),
      {
        name: user.name,
        email: user.email,
        message: newMessage,
        avatar: user.avatar,
        timestamp: serverTimestamp(),
      }
    )
    

      setNewMessage('')

      await updateDoc(
        doc(db, 'messages', currentConversation.id), {
          lastUpdated: serverTimestamp(),
          lastMessage: newMessage
        }
      )
  }

}

  return (
    <Wrapper>
      <ChatDetails>
        <Avatar>
          {
            currentConversation && <img src={currentConversation.avatar} alt={currentConversation.name} />
          }
          </Avatar>
        <ChatInfo>

          <form onSubmit={updateChatTitle}>
          <Name disabled={!currentConversation} value={currentConversation ? newTitle : "Select a convo"} onChange={e => setNewTitle(e.target.value)}/>
          </form>
          <OnlineIndicator><span>* ONLINE</span></OnlineIndicator>
        </ChatInfo>
        <Icons>
          <i className='fas fa-video' />
          <i className='fas fa-file-code' />
          <i className='fas fa-phone' />
          <i className='fas fa-volume-up' />
          <i className='fas fa-image' />
        </Icons>
      </ChatDetails>
      <MessagesWrapper>
      <Messages>
    {
        messages.map((message, index) => 
            message.email === user.email ? (
                <SentMessage message={message} key={index} />
            ) : (
                <IncomingMessage key={index} message={message} />
            )
        )
    }
</Messages>

        <form onSubmit={sendMessage}>
          <InputWrapper>
          <ActionButton>
            <i className='fas fa-plus' />
          </ActionButton>

          <MessageInput placerholder="Type a message" value={newMessage} onChange={e => setNewMessage(e.target.value)}/>

          <ActionButton onClick={sendMessage}>
            <i className='fas fa-arrow-circle-up' />
          </ActionButton>

          </InputWrapper>
        </form>
      </MessagesWrapper>
    </Wrapper>
  )
}

export default ChatView

const Wrapper = styled.div`
height: 100vh;
width: calc(98% - 40px);
max-width: 1600px;
padding: 0 20px;
display: flex;
flex-direction: column;
`

const ChatDetails = styled.div`
margin-top: 50px;
display: flex;
align-items: center;
`

const Avatar = styled.div`
height: 56px;
width: 56px;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
object-fit: contain;
margin-right: 20px;
border: 3px solid #1c91f4;

& > img{
  border-radius: 50%;
  height: 70%;

}
`

const ChatInfo = styled.div`
flex: 1;
`

const Name = styled.input`
font-size: 28px;
font-weight: 700;
background: none;
border: none;
outline: none;
`

const OnlineIndicator = styled.div`
font-weight: 500;
color: #767789;

&>span{
  color:#11d930;
}
`

const Icons = styled.div`

display: flex;


&>i{
  color: #767789;
  font-size: 22px;
  padding: 28px;
  border-radius: 50%;

  &:hover{
    cursor: pointer;
    color: #184773;
  }
}
`

const MessagesWrapper = styled.div`

background-color: #323645;
border-radius: 10px;
margin-bottom: 50px;
margin-top: 60px;
flex: 1;
display: flex;
flex-direction: column;
overflow: auto;

`

const Messages = styled.div`
flex: 1;
display: flex;
flex-direction: column-reverse;
overflow: auto;
`

const InputWrapper = styled.div`

display: flex;
align-items: center;
padding: 12px;

`

const ActionButton = styled.div`
margin: 20px;
padding: 12px;
height: 30px;
width: 30px;
display: grid;
place-items: center;
background-color: #424657;
border-radius: 12px;
font-size: 24px;

&:hover{
  background-color: blue;
  cursor: pointer;
}


`

const MessageInput = styled.input`
flex: 1;
border: none;
outline: none;
background-color: #424567;
padding: 16px;
border-radius: 12px;
font-size: 16px;

&:focus{
  border: 3px solid #184773;
}
`

