import React from 'react';
import moment from 'moment';
import { View } from 'react-native'

import { Container,AvatarContainer,Initials,InnerContainer,Message,Date,InfoContainer } from './UserCard.style'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const UserCard = ({ item,onPress,isMessagedUser }) => {


    return (
      <Container onPress= {onPress}>
            <AvatarContainer source= {{uri:item.avatar}}/>
            <InfoContainer>
                <View style={{flexDirection:'row'}}>
                  <Initials> {item.username}</Initials>
                  {!!item.online && <Icon size={20} name='circle' color='green'/>}
                </View>
            
                { isMessagedUser && item.message ?
                <InnerContainer>
                  <Date>{moment(item.message.createdAt).format('DD/MM/YYYY')}</Date>
                   <Message>{item.message.text} </Message>
                </InnerContainer>
                :
                null
                }
            </InfoContainer>
          
      </Container>
    );
  };



  export default UserCard;