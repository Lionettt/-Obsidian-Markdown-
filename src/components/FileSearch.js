import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

import useKeyPress from '../hooks/useKeyPress'


export default function FileSearch(props) {
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState('');
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27)

  const onFileSearch = (value) => {
    console.log(value)
  };
  const closeSearch = () => {
    setInputActive(false);
    setValue('');
  }

  useEffect(() => {
    if (enterPressed && inputActive) {
      onFileSearch(value)
    }
    if (escPressed && inputActive) {
      closeSearch()
    }
  })
  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0">
      {!inputActive &&
        <div>
          <span>Lionet</span>
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
        <div calssName="d-flex justify-content-between align-items-center">
          <input
            className="from-control col-8"
            value={value}
            onChange={(e) => { setValue(e.target.value) }}
          >
          </input>
          <button
            className="btn btn-primary col-4"
            type="button"
            onClick={() => { setInputActive(false) }}
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
