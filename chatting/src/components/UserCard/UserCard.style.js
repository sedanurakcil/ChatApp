import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin:8px;
  padding: 5px;
  border-radius: 10px;
  background-color: ${Colors.back};
  elevation:5;
`;

export const AvatarContainer = styled.Image`

  background-color: lightgray;
  border-radius: 25px;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

export const Initials = styled.Text`
  color: ${Colors.text};
  font-weight: bold;
  font-size:17px;
  margin-bottom:10px;
  
  
`;
