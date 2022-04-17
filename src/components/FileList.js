import React from 'react'
import { useState, useEffect, } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import useKeyPress from '../hooks/useKeyPress'

export default function FileList(props) {
  const { defaultFiles, opendTab, listDelete, upDateListName } = props;

  const [ediStatus, setEdiStatus] = useState(false) //编辑状态
  const [value, setValue] = useState('')//编辑值

  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27)

  const listEdit = (defaultFiles) => {
    setEdiStatus(defaultFiles.id)
    setValue(defaultFiles.title)
  }
  const listEditClose = () => {
    setEdiStatus(false);
    setValue('');
  }

  useEffect(() => {
    if (enterPressed && ediStatus) {
      const ediItem = defaultFiles.find(defaultFiles => defaultFiles.id === ediStatus)
      upDateListName(ediItem.id, value)
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
              {(ediStatus !== defaultFiles.id) &&
                <>
                  <span
                    className="col-8 c-link"
                    onClick={() => { opendTab(defaultFiles) }}
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
                    onClick={(e) => { listDelete(e, defaultFiles) }}
                  >
                    <FontAwesomeIcon
                      title="删除"
                      size="lg"
                      icon={faTrash}
                    />
                  </button>
                </>
              }
              {(ediStatus === defaultFiles.id) &&
                <>
                  <input
                    className="form-control col-10"
                    value={value}
                    onChange={e => { setValue(e.target.value) }}
                  />
                  <button
                    className="icon-button col-2"
                    type="button"
                    onClick={() => { listEditClose() }}
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