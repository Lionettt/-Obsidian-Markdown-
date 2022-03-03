import React from 'react'
import { useState, useEffect } from 'react'
export default function FileSearch(props) {
  const { onFileSearch } = props
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState('');
  const closeSearch = (e) => {
    e.preventDefault();
    setInputActive(false);
    setValue('');
  }
  useEffect(() => {
    const handleInputEvent = (event) => {
      const { ketCode } = event;
      if (ketCode === 13 && inputActive) {
        onFileSearch(value);
      } else if (ketCode === 27 && inputActive) {
        closeSearch(event)
      }
    }
    document.addEventListener('keyup', handleInputEvent);
    return () => {
      document.removeEventListener('keyUp', handleInputEvent)
    }
  })
  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0">
      {!inputActive &&
        <div className="d-flex justify-content-between align-items-center">
          <span>Lionet</span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => { setInputActive(true) }}
          >
            搜索
          </button>
        </div>
      }
      {inputActive &&
        <div>
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
            返回
          </button>
        </div>

      }
    </div>
  )
}
