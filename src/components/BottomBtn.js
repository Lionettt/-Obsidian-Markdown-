
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'

export default function BottomBtn() {
  return (
    <div className="row no-gutters button-group">
      <div className="col">
        <button
          type="button"
          className={`btn btn-block no-border btn-primary`}
          onClick={() => { }}
        >
          <FontAwesomeIcon
            className="mr-2"
            size="lg"
            icon={faPlus}
          />
          新建
        </button>
      </div>
      <div className="col">
        <button
          type="button"
          className={`col btn btn-block no-border btn-success`}
          onClick={() => { }}
        >
          <FontAwesomeIcon
            className="mr-2"
            size="lg"
            icon={faFileImport}
          />
          导入
        </button>
      </div>
    </div>
  )
}
