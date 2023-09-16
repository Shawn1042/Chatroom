import React, { useState } from 'react'
import styled from 'styled-components'
import SuperMan from "../assets/superman.jpg"
import {getAuth, signOut} from 'firebase/auth'

const Sidebar = ({user, setUser}) => {

  const [activeIcon, setActiveIcon] = useState('inbox')
  const auth = getAuth()

  return (
    <Wrapper>
      <LogoContainer>
        <img src={SuperMan} alt='Superman comic'/>
      </LogoContainer>
      <SideBarIcons>
        <SideBarIcon onClick={() => setActiveIcon('inbox')}><i className="fas fa-inbox" style={{color: activeIcon === 'inbox' && '#1d90f4'}}/></SideBarIcon>
        <SideBarIcon onClick={() => setActiveIcon('cog')}><i className="fas fa-cog" style={{color: activeIcon === 'cog' && '#1d90f4'}}/></SideBarIcon>
        <SideBarIcon onClick={() => setActiveIcon('bolt')}><i className="fas fa-bolt" style={{color: activeIcon === 'bolt' && '#1d90f4'}}/></SideBarIcon>
        <SideBarIcon onClick={() => setActiveIcon('circle')}><i className="fas fa-user-circle" style={{color: activeIcon === 'circle' && '#1d90f4'}}/></SideBarIcon>
      </SideBarIcons>
      <ProfileIcon onClick={() => signOut(auth)}>
      <img src={user.avatar} alt={user.name}/>
      </ProfileIcon>
    </Wrapper>
  )
}

export default Sidebar

const Wrapper = styled.div`

height: calc(100vh - 100px);
padding: 50px 0;
width: 100px;
display: flex;
justify-content: space-between;
flex-direction: column;
align-items: center;

`

const LogoContainer = styled.div`
  height: 70px;
  object-fit: contain;

  & > img {
    border-radius: 2px;
    height: 100%;

    &:hover {
      transform: scale(0.8);
      transition: all 0.5s;  // Using 'all' to ensure both the transform and box-shadow animate
      cursor: pointer;
      box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.6);  // Glowing box-shadow
    }
  }
`;



const SideBarIcons = styled.div`

flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`


const ProfileIcon = styled.div`

height: 70px;
object-fit: contain;
display: flex;

& > img{
  height: 80%;
  border-radius: 50%;
  object-fit: contain;

  &:hover{
    -webkit-box-shadow: 0 5px 24px -3px white;
    box-shadow: 0 5px 24px 0px white;
  }
}

&:hover{
  cursor: pointer;
  transform: scale(0.89);
}
`

const SideBarIcon = styled.div`

& > i {
  color: #767789;
  font-size: 28px;
  padding: 28px;
  border-radius: 50%;

  &:hover{
  color: #184773;
  cursor: pointer;
}
}


`