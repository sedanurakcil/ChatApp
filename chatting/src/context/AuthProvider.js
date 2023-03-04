import React, {useState, useEffect} from 'react'
import {Provider} from 'react-redux'
import {legacy_createStore as createStore}from 'redux'
import reducers from './reducers'
import initialValues from './store';


const AuthProvider = ({children})=>{
  
    const store = createStore(reducers,initialValues)
    return <Provider store={store}>{children}</Provider>

}

export default AuthProvider
