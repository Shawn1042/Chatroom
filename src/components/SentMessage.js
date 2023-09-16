import React from 'react'
import styled from 'styled-components'

const SentMessage = ({message}) => {
  return (
    <Wrapper>
        <Bubble>{message.message}</Bubble>
        <Details>
            <Name>You</Name>
            <Avatar>
                <img src={message.avatar} alt={message.name} />
            </Avatar>
        </Details>
    </Wrapper>
  )
}

export default SentMessage

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 12px;
width: calc(100% - 24px);
`

const Bubble = styled.div`
background-color: #1d90f4;
padding: 20px;
border-radius: 28px 28px 4px 28px;
font-weight: 500;
`
const Details = styled.div`
margin-top: 5px;
display: flex;
`

const Name = styled.div`

font-weight: 500;

`
const Avatar = styled.div`

margin-left: 12px;

& > img{
    width: 22px;
border-radius: 50%;
}`