import React from 'react'

import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'

import defaultFiles from '../utils/defaultFiles'
import useKeyPress from '../hooks/useKeyPress'
import useContextMenu from '../hooks/useContextMenu'
import { getParentNode } from '../utils/helper'

export default function FileList() {
  return (
    <ul className="list-group list-group-flush file-list">
      {
        defaultFiles.map(file => {
          return (
            <li
              className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
              key={file.id}
              data-id={file.id}
              data-title={file.title}
            >
              {file.title}
            </li>
          )
        })
      }
    </ul>
  )
}