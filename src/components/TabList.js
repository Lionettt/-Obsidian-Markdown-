import React from 'react'
import { useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './TabList.scss'

import defaultFiles from '../utils/defaultFiles'
import { flattenArr } from '../utils/helper'
export default function TabList() {
  const activeId = "1";
  let unsaveIds = ["1", "2"];
  const tabClick = (e, defaultFiles) => {
    e.stopPropagation();
    console.log(defaultFiles.id)
  }
  const tabClose = (e, defaultFiles) => {
    e.stopPropagation(); //防止冒泡
    console.log(defaultFiles.id)
  }
  return (
    <ul className="nav nav-pills tablist-component">
      {defaultFiles.map(defaultFiles => {
        const withUnsavedMark = unsaveIds.includes(defaultFiles.id)
        const fClassName = classNames({
          'nav-link': true,
          'active': defaultFiles.id === activeId,
          'withUnsaved': withUnsavedMark
        })

        return (
          <li className="nav-item" key={defaultFiles.id}>
            <a
              href="#"
              className={fClassName}
              onClick={(e) => { tabClick(e, defaultFiles)  }}
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