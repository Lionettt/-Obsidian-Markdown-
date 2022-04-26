import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

import useKeyPress from '../hooks/useKeyPress'

export default function FileSearch(props) {
  const { searchList,files } = props

  const [inputActive, setInputActive] = useState(false); //控制输入框是否高亮
  const [value, setValue] = useState('');  //输入框的value
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27)
  let node = useRef(null)

  const closeSearch = () => {
    setInputActive(false);
    setValue('');
    searchList(files);
  }

  useEffect(() => {
    if (enterPressed && inputActive) {
      searchList(value)
    }
    if (escPressed && inputActive) {
      closeSearch()
    }
  })
  useEffect(() => {
    if (inputActive) {
      node.current.focus()
    }
  }, [inputActive])

  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0">
      {!inputActive &&
        <div>
          <span className="h2">Lionet</span>
          <button
            type="button"
            className="icon-button"
            onClick={() => { setInputActive(true) }}
          >
            <FontAwesomeIcon
              title="搜索"
              size="lg"
              icon={faSearch}
            />
          </button>
        </div>
      }
      {inputActive &&
        <div className="d-flex justify-content-between align-items-center">
          <input
            className="from-control col-8"
            ref={node}
            value={value}
            onChange={(e) => { setValue(e.target.value) }}
          >
          </input>
          <button
            className="btn btn-primary col-4 " 
            type="button"
            onClick={() => { closeSearch() }}
          >
            <FontAwesomeIcon
              title="关闭"
              size="lg"
              icon={faTimes}
            />
          </button>
        </div>

      }
    </div>
  )
}