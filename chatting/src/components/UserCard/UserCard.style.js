import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin:10px;
  border-radius: 15px;
  background-color: ${Colors.back};
  elevation:5;
  padding:3px;
`;

export const AvatarContainer = styled.Image`
  background-color: lightgray;
  border-radius: 25px;
  height: 50px;
  width: 50px;
  margin-horizontal: 10px;

`;


export const InfoContainer = styled.View`
  background-color: ${Colors.back};
`
export const Initials = styled.Text`
  color: ${Colors.text};
  font-weight: bold;
  font-size:20px;
  margin-right:20px;
  bottom:3px;

`;

export const InnerContainer = styled.View`
  position:relative;
  margin-left:5px;
  bottom:10px;


`;

export const Message = styled.Text`
  font-size: 16px;
  color: gray;
 
`;

export const Date = styled.Text`
  font-size: 12px;
  color: gray;
  position:relative;
  margin-left:200px;

 `;







