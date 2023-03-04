import styled from 'styled-components/native';
import { Bubble } from 'react-native-gifted-chat';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const StyledBubble = styled(Bubble)`
    ${({ position }) => `
    background-color: ${position === 'left' ? '#F5F5F5' : '#6495ED'};
    `}
    `;

export const BubbleText = styled.Text`
    font-size: 16px;
    color: ${({ position }) => position === 'left' ? '#000' : '#fff'};
    `;