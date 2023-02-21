import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  elevation: 5;
`;

export const AvatarContainer = styled.Image`

  background-color: lightgray;
  border-radius: 20px;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

export const Initials = styled.Text`
  color: black;
  font-weight: bold;
  
`;
