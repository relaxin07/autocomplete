import React from 'react'
import { countries } from './country'
import './App.scss'

class App extends React.Component {
  allCountries = countries
  state = {
    inputValue: '',
    data: null,
    indexActiveItem: -1,
  }

  onChange = (e) => {
    this.setState({ inputValue: e.target.value })
    this.dataHandler(e.target.value.toLowerCase())
  }
  onKeyDown = (e) => {
    let { indexActiveItem } = this.state
    switch (e.keyCode) {
      case 38:
        indexActiveItem--
        this.addActive(indexActiveItem)
        break
      case 40:
        indexActiveItem++
        this.addActive(indexActiveItem)
        break
      case 13:
        this.choiseSelect(indexActiveItem)
        break
    }
  }

  choiseSelect = (indexCurrent) => {
    const { data } = this.state
    if (data !== null) {
      this.setState(() => ({
        inputValue: data[indexCurrent],
        data: null,
        indexActiveItem: -1,
      }))
    }
  }
  dataHandler = (value) => {
    let arrdata = []
    if (value.length > 1) {
      arrdata = this.allCountries.filter((country, i) => {
        return country.toLocaleLowerCase().includes(value)
      })

      this.setState(() => ({
        data: arrdata,
      }))
    } else {
      this.setState({ data: null })
    }
  }
  addActive = (indexActiveItem) => {
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
  render() {
    const { data, indexActiveItem, inputValue } = this.state
    let resultData = []
    if (data !== null) {
      resultData = data.map((item, i) => {
        if (indexActiveItem !== null && indexActiveItem === i) {
          return (
            <div key={i} className="hint-item active">
              {item}
            </div>
          )
        }
        return (
          <div
            key={i}
            className="hint-item"
            onClick={() => {
              this.choiseSelect(i)
            }}
          >
            {item}
          </div>
        )
      })
    }

    return (
      <div className="container">
        <h2>SelectBox</h2>
        <h5>Search countries</h5>
        <input
          value={inputValue}
          className="main-input"
          type="text"
          onKeyDown={(event) => {
            this.onKeyDown(event)
          }}
          onChange={(event) => this.onChange(event)}
        />
        <div>
          {resultData.map((items) => {
            return items
          })}
        </div>
      </div>
    )
  }
}

export default App
