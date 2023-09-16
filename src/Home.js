import styled from 'styled-components'
import SideBar from './components/Sidebar'
import ChatList from './components/ChatList'
import ChatView from './components/ChatView'
import Dimden from './assets/dimden.png'
import {db} from './firebase'
import {collection, query, orderBy, onSnapshot} from 'firebase/firestore'
import { useEffect, useState } from 'react'


function Home({user, setUser}) {

    const [conversationData, setconversationData] = useState([])
    const [currentConversation, setCurrentConversation] = useState('')

  
   useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('lastUpdated', 'desc'))
    const unsubscribe = onSnapshot(q, snapshot => {
        const conversations = []

        snapshot.docs.map(doc => {
            conversations.push({
                id: doc.id,
                ...doc.data(),
            })
        })
        setconversationData(conversations)
    })

    return () => unsubscribe
   }, [])
    

  return (
    <Wrapper>

      <SideBar user={user} setUser={setUser}/>
      <ChatList conversationData={conversationData} currentConversation={currentConversation} setCurrentConversation={setCurrentConversation} />
      <Main>
        <ChatView currentConversation={currentConversation} user={user}/>
      </Main>
      
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  background-image: url(${Dimden});
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  display: flex;
`;

const Main = styled.div`
flex: 1;
display: flex;
justify-content: center;
`


