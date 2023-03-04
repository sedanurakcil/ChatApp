import React  from 'react';
import Router from './src/navigation/Router';
import io from 'socket.io-client'
import AuthProvider from './src/context/AuthProvider';

const App =() =>{

  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  )

}

  export default App