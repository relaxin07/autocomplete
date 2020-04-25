import React from 'react'
import './App.scss'
import { bindActionCreators } from 'redux'
import * as actions from './store/modules/autocomplete'
import { connect } from 'react-redux'
import equal from 'deep-equal'
import Autocomplete from './autocomplete/Autocomplete'

const mapState = ({ autoComplete: { data } }) => {
  return { data }
}
const mapDispatch = (dispatch) => {
  const { getSearchData } = bindActionCreators(actions, dispatch)
  return { getSearchData }
}

class App extends React.Component {
  minCountSymbols = 2
  state = {
    data: [],
  }

  componentDidUpdate(prevProps) {
    if (!equal(prevProps.data, this.props.data)) {
      this.setState(() => ({ data: this.handlerPrepareData(this.props.data) }))
    }
  }

  handlerPrepareData = (data) => {
    if (data === null) {
      return null
    }
    return data.map((item, i) => {
      if (typeof item !== 'object') {
        return { value: item, label: i }
      } else {
        for (const val in item) {
          return { value: item[val], label: val }
        }
      }
    })
  }

  render() {
    const { data } = this.state
    return (
      <Autocomplete
        data={data}
        minCountSymbols={this.minCountSymbols}
        onGetSearchData={this.props.getSearchData}
      />
    )
  }
}

export default connect(mapState, mapDispatch)(App)
