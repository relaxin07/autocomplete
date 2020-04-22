import React from 'react'
import { connect } from 'react-redux'
import App from '../App'
import * as actions from '../store/modules/autocomplete/index'
import { bindActionCreators } from 'redux'

class Autocomplete extends React.Component {
  state = {
    data: null,
    inputValue: '',
    indexActiveItem: -1,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState(() => ({
        data: this.props.data,
      }))
    }
  }
  onKeyDown = (e) => {
    let { indexActiveItem } = this.state
    switch (e.keyCode) {
      case 38:
        indexActiveItem--
        this.defineIndexActive(indexActiveItem)
        break
      case 40:
        indexActiveItem++
        this.defineIndexActive(indexActiveItem)
        break
      case 13:
        this.choiceSelect(indexActiveItem)
        break
    }
  }
  onChange = (e) => {
    this.setState({ inputValue: e.target.value, indexActiveItem: -1 })
    if (e.target.value.length > 1) {
      this.props.getSearchData(e.target.value.toLowerCase())
    } else {
      this.setState(() => ({
        data: null,
      }))
    }
  }
  //Запоминаем текст выбранного элемента
  choiceSelect = (indexCurrent) => {
    const { data } = this.state
    if (data !== null) {
      this.setState(() => ({
        inputValue: data[indexCurrent],
        data: null,
        indexActiveItem: -1,
      }))
    }
  }
  // определяем активный индекс элемента
  defineIndexActive = (indexActiveItem) => {
    const { data } = this.state
    if (data === null) {
      return false
    }
    if (indexActiveItem === data.length) {
      indexActiveItem = 0
    }
    if (indexActiveItem < 0) {
      indexActiveItem = data.length - 1
    }
    this.setState(() => ({
      indexActiveItem,
    }))
  }
  // подготавливаем массив данных к рендеру.
  prepareData = (data) => {
    if (data === null) {
      return null
    }
    return data.map((item) => {
      if (typeof item !== 'object') {
        return { myValue: item }
      }
    })
  }

  render() {
    const { inputValue, data, indexActiveItem } = this.state
    return (
      <App
        data={data}
        prepareData={this.prepareData}
        indexActive={indexActiveItem}
        input={
          <input
            className="main-input"
            type="text"
            value={inputValue}
            onChange={(event) => {
              this.onChange(event)
            }}
            onKeyDown={(event) => {
              this.onKeyDown(event)
            }}
          />
        }
      />
    )
  }
}

const mapState = ({ autoComplete: { data } }) => {
  return { data }
}
const mapDispatch = (dispatch) => {
  const { getSearchData } = bindActionCreators(actions, dispatch)
  return { getSearchData }
}

export default connect(mapState, mapDispatch)(Autocomplete)
