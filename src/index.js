import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Autocomplete from '././autocomplete/Autocomplete'
import { Provider } from 'react-redux'
import store from './store/store'

ReactDOM.render(
  <Provider store={store}>
    <Autocomplete />
  </Provider>,
  document.getElementById('root')
)
