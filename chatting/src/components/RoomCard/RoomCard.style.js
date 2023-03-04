import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 10px;
  padding: 5px;
  border-radius: 10px;
  background-color: ${Colors.purple};
  elevation: 5;
`;

export const AvatarContainer = styled.Image`
  background-color: lightgray;
  border-radius: 20px;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  margin-horizontal: 5px;
`;

export const Initials = styled.Text`
  color: white;
  font-weight: bold;
  font-size:18px;
  
`;
