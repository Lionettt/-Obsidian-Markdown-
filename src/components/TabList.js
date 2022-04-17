import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './TabList.scss'

export default function TabList(props) {
  const {openTabList, acvtiveTabFile, unSaveTabIDs, setTabActive, tabClose } = props;
  
  return (
    <ul className="nav nav-pills tablist-component">
      {openTabList.map(defaultFiles => {
        const withUnsavedMark = unSaveTabIDs.includes(defaultFiles.id)
        const fClassName = classNames({
          'nav-link': true,
          'active': defaultFiles.id === acvtiveTabFile,
          'withUnsaved': withUnsavedMark
        })
        
        return (
          <li className="nav-item" key={defaultFiles.id}>
            <a
              href="#"
              className={fClassName}
              onClick={(e) => { setTabActive(e,defaultFiles)}}
            >
              {defaultFiles.title}
              <span
                className="ml-2 close-icon"
                onClick={(e) => { tabClose(e, defaultFiles) }}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                />
              </span>
              {withUnsavedMark && <span className="rounded-circle ml-2 unsaved-icon"></span>}
            </a>
          </li>
        )
      })}
    </ul>
  )


}