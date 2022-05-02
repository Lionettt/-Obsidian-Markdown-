import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import useKeyPress from '../hooks/useKeyPress'

export default function FileList(props) {
  const { defaultFiles, opendTab, listDelete, upDateListName } = props;

  const [ediStatus, setEdiStatus] = useState(false)//编辑状态
  const [value, setValue] = useState('')//编辑内容
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27)
  let node = useRef(null);
  const ediItem = defaultFiles.find(defaultFiles => defaultFiles.id === ediStatus)//编辑项


  const listEdit = (defaultFiles) => {
    setEdiStatus(defaultFiles.id)
    setValue(defaultFiles.title)
  }
  const listEditClose = (ediItem) => {
    setEdiStatus(false);
    setValue('');
    if (ediItem.isNew) {
      listDelete(ediItem)
    }
  }
  //编辑和退出
  useEffect(() => {
    if (enterPressed && ediStatus && value.trim() !== '') { 
      upDateListName(ediItem.id, value, ediItem.isNew)
      setValue('')
      setEdiStatus(false);
    }
    if (escPressed && ediStatus) {
      listEditClose(ediItem)
    }
  })
  //新建逻辑
  useEffect(() => {
    const newFile = defaultFiles.find(defaultFiles => defaultFiles.isNew)
    if (newFile) {
      setEdiStatus(newFile.id);
      setValue(newFile.title);
    }
  }, [defaultFiles])

  //高亮
  useEffect(() => {
    if (ediStatus) {
      node.current.focus()
    }
  }, [ediStatus])


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
              {((ediStatus !== defaultFiles.id) && !defaultFiles.isNew) &&
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
                    onClick={() => { listDelete(defaultFiles) }}
                  >
                    <FontAwesomeIcon
                      title="删除"
                      size="lg"
                      icon={faTrash}
                    />
                  </button>
                </>
              }
              {((ediStatus === defaultFiles.id) || defaultFiles.isNew) &&
                <>
                  <input
                    className="form-control col-10"
                    placeholder='请输入文件名'
                    value={value}
                    ref={node}
                    onChange={e => { setValue(e.target.value) }}
                  />
                  <button
                    className="icon-button col-2"
                    type="button"
                    onClick={() => { listEditClose(defaultFiles) }}
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