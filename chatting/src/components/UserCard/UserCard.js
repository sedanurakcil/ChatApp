import React from 'react';

import { Container,AvatarContainer,Initials } from './UserCard.style'


const UserCard = ({ item,onPress }) => {
    return (
      <Container onPress= {onPress}>
            <AvatarContainer source= {{uri:item.avatar}}/>
            <Initials> {item.username}</Initials>
      </Container>
    );
  };



  export default UserCard;