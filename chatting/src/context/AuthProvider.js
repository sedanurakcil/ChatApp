import React, {useState, useEffect} from 'react'
import {Provider} from 'react-redux'
import {legacy_createStore as createStore,applyMiddleware}from 'redux'
import reducers from './reducers'
import initialValues from './store';
import thunk from 'redux-thunk'

const AuthProvider = ({children})=>{
  
    const store = createStore(reducers,initialValues,applyMiddleware(thunk))
    return <Provider store={store}>{children}</Provider>

}

export default AuthProvider
