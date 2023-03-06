import React from 'react';
import moment from 'moment';

import { Container,AvatarContainer,Initials,Message,Date,InnerContainer } from './RoomCard.style'


const RoomCard = ({ item,onPress }) => {
    return (
      <Container onPress= {onPress}>
            <AvatarContainer source={{uri:item.avatar}}/>
            <InnerContainer>
                <Initials> {item.roomName}</Initials>
                {item.messages[0] ?
                <>
                <Date>{moment(item.messages[0].createdAt).format('DD/MM/YYYY')}</Date>
                <Message>{item.messages[0].text}</Message>
                
                </>
                :
                null

                }
                
            </InnerContainer>
      </Container>
    );
  };



  export default RoomCard;