import { Bubble} from 'react-native-gifted-chat'


function PrivateBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#9370db',
          },
          left: {
            backgroundColor: '#fff',
          },
        }}
        textStyle={{
          right: {
            color: '#fff', 
          },
          left: {
            color: '#000', 
          },
        }}
      />
    );
  }

export default PrivateBubble