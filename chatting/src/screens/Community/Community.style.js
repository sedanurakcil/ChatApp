
import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.View`
  flex:1;
`;

export const InnerContainer = styled.View`
  position: absolute;
  bottom:0;
  width: 100%;
  

`;

export const Input = styled.TextInput`
  padding:10px;
  margin:10px;
  color: black;
  background-color: white;
  border:1px;
  border-color:${Colors.purple};
  border-radius: 15px;
  elevation:5;
 
 
  
`;

export const Button = styled.TouchableOpacity`
  background-color: ${Colors.purple};
  border-radius: 8px;
  padding: 10px 20px;
  elevation:5;
  margin:5px;
  align-items:center;
  margin:10px;
  
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

