import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 10px;
  padding: 2px;
  border-radius: 10px;
  background-color: ${Colors.purple};
  elevation: 5;
`;

export const AvatarContainer = styled.Image`
  background-color: lightgray;
  border-radius: 25px;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  margin-horizontal: 5px;
`;

export const InnerContainer = styled.View`
  margin-left:7px;

`;

export const Initials = styled.Text`
  color: white;
  font-weight: bold;
  font-size:20px;
  
`;

export const Message = styled.Text`
  font-size: 15px;
  color: white;
  bottom:5px;
`;

export const Date = styled.Text`
  font-size: 12px;
  margin-left:210px;
  color: white;
  bottom:10px;

 `;
