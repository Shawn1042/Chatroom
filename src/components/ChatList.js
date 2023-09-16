import React from 'react'
import { styled } from 'styled-components' 



const ChatList = ({ conversationData, currentConversation, setCurrentConversation }) => {
  return (
    <Wrapper>
      <Title>Chat</Title>
      <SubTitle>Conversations</SubTitle>
      <Conversations>
        {conversationData.map((conversation, index ) => (
          <ConversationCard key={index}
          style={{
            backgroundColor: currentConversation.id === conversation.id ? '#1d90f4' : '#2d3436'}}
          onClick={() => setCurrentConversation(conversation)}
          >
            <Avatar>
              <img src={conversation.avatar} alt={conversation.name}/>
            </Avatar>
            <ConversationInfo>
              <Name>{conversation.name}</Name>
              <LastMessage>{conversation.lastMessage}</LastMessage>
            </ConversationInfo>
          </ConversationCard>
        ))}
      </Conversations>
    </Wrapper>
  )
}

export default ChatList

const Wrapper = styled.div`

width: 300px;
height: calc()100vh - 100px;
padding: 50px 32px;
`

const Title = styled.div`
font-size: 48px;
font-weight: 700;
margin-bottom: 60px;
`

const SubTitle = styled.div`
color: #767789;
font-size: 28px;
font-weight: 500;
margin-bottom: 40px;
`

const Conversations = styled.div``

const ConversationCard = styled.div`
display: flex;
margin: 12px -12px;
padding: 12px;
border-radius: 12px;

&:hover{
  background-color: #184773 !important;
  cursor: pointer;
}
`

const Avatar = styled.div`
width: 60px;
margin-right: 12px;
display: grid;
place-items: center;

& > img{
  width: 80%;
  object-fit: contain;

}
`

const ConversationInfo = styled.div``

const Name = styled.div`
font-size: 24px;
font-weight: 700;
`

const LastMessage = styled.div`
font-weight: 500;
`