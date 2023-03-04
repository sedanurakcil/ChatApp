import React from 'react';

import { Container,AvatarContainer,Initials } from './RoomCard.style'


const RoomCard = ({ item,onPress }) => {
    return (
      <Container onPress= {onPress}>
            <AvatarContainer source={{uri:item.avatar}}/>
            <Initials> {item.roomName}</Initials>
      </Container>
    );
  };



  export default RoomCard;