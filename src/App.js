import React from 'react'
import './App.scss'

const renderData = (arr, indexActive) => {
  if (arr === null) {
    return false
  }
  return arr.map((item, i) => {
    for (const val in item) {
      let activeClass = i === indexActive ? 'active' : ''
      return (
        <div key={i} className={`hint__item ${activeClass}`}>
          {item[val]}
        </div>
      )
    }
  })
}

function App(props) {
  const { indexActive, input } = props
  let resultRender = renderData(props.prepareData(props.data), indexActive)
  return (
    <div className="container">
      <h2>Selectbox</h2>
      {input}
      <div>{resultRender}</div>
    </div>
  )
}

export default App
