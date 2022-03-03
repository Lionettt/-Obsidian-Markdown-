import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function BottomBtn(props) {
  const { text, icon, onBtnClick } = props;

  return (
    <div>
      <button
        type="button"
        className={`btn btn-block no-border btn-primary`}
        onClick={onBtnClick}
      >
        <FontAwesomeIcon
          className="mr-2"
          size="lg"
          icon={icon}
        />
        {text}
      </button>
    </div>
  )
}
