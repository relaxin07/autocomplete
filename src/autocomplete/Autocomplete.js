import React from 'react'
import equal from 'deep-equal'
import PropTypes from 'prop-types'

class Autocomplete extends React.Component {
  state = {
    data: [],
    selectValue: '',
    indexActiveItem: -1,
    isShowData: false,
  }

  static propTypes = {
    data: PropTypes.array,
    minCountSymbols: PropTypes.number,
    onGetSearchData: PropTypes.func,
  }

  componentDidUpdate(prevProps) {
    if (!equal(prevProps.data, this.props.data)) {
      this.setState(() => ({ data: this.props.data }))
    }
  }

  handlerKeyDown = ({ keyCode }) => {
    let { indexActiveItem } = this.state
    switch (keyCode) {
      case 38:
        this.handlerDefineIndexActive(indexActiveItem - 1)
        break
      case 40:
        this.handlerDefineIndexActive(indexActiveItem + 1)
        break
      case 13:
        this.handlerChoiceSelect(indexActiveItem)
        break
    }
  }
  handlerChangeInput = (event) => {
    const { value } = event.target
    this.setState({ selectValue: value, indexActiveItem: -1 })

    if (value.length > this.props.minCountSymbols) {
      this.props.onGetSearchData(value.toLowerCase())
      this.setState(() => ({
        isShowData: true,
      }))
    } else {
      this.setState(() => ({
        isShowData: false,
      }))
    }
  }
  //Запоминаем текст выбранного элемента
  handlerChoiceSelect = (indexCurrent) => {
    if (indexCurrent === -1) {
      return false
    }
    const { data } = this.state
    const { value } = data[indexCurrent]
    this.setState(() => ({
      selectValue: value,
      data: [],
      indexActiveItem: -1,
    }))
  }
  // определяем активный индекс элемента
  handlerDefineIndexActive = (indexActiveItem) => {
    const { data } = this.state
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

  handlerRenderData = (arr, indexActive) => {
    return arr.map(({ value }, i) => {
      let activeClass = i === indexActive ? 'active' : ''
      return (
        <div
          key={i}
          onClick={() => this.handlerChoiceSelect(i)}
          className={`hint__item ${activeClass}`}
        >
          {value}
        </div>
      )
    })
  }

  render() {
    const { selectValue, data, indexActiveItem, isShowData } = this.state
    let renderData = isShowData ? this.handlerRenderData(data, indexActiveItem) : null
    return (
      <div className="container">
        <h2>Selectbox</h2>
        <input
          className="main-input"
          type="text"
          value={selectValue}
          onChange={this.handlerChangeInput}
          onKeyDown={this.handlerKeyDown}
        />
        {renderData}
      </div>
    )
  }
}

export default Autocomplete
