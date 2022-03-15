import React from 'react'

import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'

import defaultFiles from '../utils/defaultFiles'
import useKeyPress from '../hooks/useKeyPress'
import useContextMenu from '../hooks/useContextMenu'
import { getParentNode } from '../utils/helper'

export default function FileList() {
  const [ediStatus, setEdiStatus] = useState(false)
  const [value, setValue] = useState('')
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27)

  const listClick = (id) => {
    console.log(id);
  }
  const listDelet = (id) => {
    console.log(id);
  }
  const listEdit = (defaultFiles) => {
    setEdiStatus(defaultFiles.id)
    setValue(defaultFiles.title)
  }
  const listEditClose = (e) => {

    setEdiStatus(false);
    setValue('');
  }

  // 编辑状态的时候
  const onSaveEdit = (id, newValue) => {
    console.log(id)
    console.log(newValue)
  }

  useEffect(() => {
    if (enterPressed && ediStatus) {
      const ediItem = defaultFiles.find(defaultFiles => defaultFiles.id === ediStatus)
      onSaveEdit(ediItem.id, value)
      setEdiStatus(false);
      setValue('')
    }
    if (escPressed && ediStatus) {
      listEditClose()
    } 
  })

  return (
    <ul className="list-group list-group-flush file-list">
      {
        defaultFiles.map(defaultFiles => {
          return (
            <li
              className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
              key={defaultFiles.id}
              data-id={defaultFiles.id}
              data-title={defaultFiles.title}
            >
              {(defaultFiles.id !== ediStatus) &&
                <>
                  <span
                    className="col-8 c-link"
                    onClick={() => { listClick(defaultFiles.id) }}
                  >
                    {defaultFiles.title}
                  </span>
                  <button
                    className='icon-button col-1'
                    type="button"
                    onClick={() => { listEdit(defaultFiles) }}
                  >
                    <FontAwesomeIcon
                      title="编辑"
                      size="lg"
                      icon={faEdit}
                    />
                  </button>
                  <button
                    className='icon-button col-1'
                    type="button"
                    onClick={() => { listDelet(defaultFiles) }}
                  >
                    <FontAwesomeIcon
                      title="删除"
                      size="lg"
                      icon={faTrash}
                    />
                  </button>
                </>
              }
              {(defaultFiles.id == ediStatus) &&
                <>
                  <input
                    className="form-control col-10"
                    value={value}
                    onChange={e => { setValue(e.target.value) }}
                  />
                  <button
                    className="icon-button col-2"
                    type="button"
                    onClick={(e) => { listEditClose(e) }}
                  >
                    <FontAwesomeIcon
                      title="退出"
                      size="lg"
                      icon={faTimes}
                    />
                  </button>
                </>
              }
            </li>
          )
        })
      }
    </ul>
  )
}