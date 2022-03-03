import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './TabList.scss'

import defaultFiles from '../utils/defaultFiles'
export default function TabList() {
  const activeId = "1";
  let unsaveIds = [1, 2];

  return (
    <ul className="nav nav-pills tablist-component">
      {defaultFiles.map(file => {

        const onTabClick = (id) => {
          console.log(id);
        }
        const onCloseTab = (id) => {
          console.log(id);
        }
        const withUnsavedMark = unsaveIds.includes(file.id)
        const fClassName = classNames({
          'nav-link': true,
          'active': file.id === activeId,
          'withUnsaved': withUnsavedMark
        })
        return (
          <li className="nav-item" key={file.id}>
            <a
              href="#"
              className={fClassName}
              onClick={(e) => { e.preventDefault(); onTabClick(file.id) }}
            >
              {file.title}
              <span
                className="ml-2 close-icon"
                onClick={(e) => { e.stopPropagation(); onCloseTab(file.id) }}
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











  // const onTabClick = (defaultFiles, e) => {
  //   e.preventDefault()
  //   console.log(defaultFiles.id);
  // }
  // return (
  //   <ul className="nav nav-pills tablist-component">
  //     {defaultFiles.map(defaultFiles => {
  //       return (
  //         <li className="nav-item" key={defaultFiles.id}>
  //           <a
  //             href="#"
  //             className=""
  //             onClick={e => {onTabClick(defaultFiles, e)}}
  //           >
  //             {defaultFiles.title}
  //           </a>
  //         </li>
  //       )
  //     })}
  //   </ul>
  // )
}