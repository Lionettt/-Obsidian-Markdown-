import { useState, useEffect } from 'react'

const useKeyPress = (currentKeyCode) => {
  const [keyPressed, setKeyPressed] = useState(false)

  //解构事件对象，根据数字处理情况
  const keyDownHandler = ({ keyCode }) => {
    if (keyCode === currentKeyCode) {
      setKeyPressed(true)
    }
  }
  const keyUpHandler = ({ keyCode }) => {
    if (keyCode === currentKeyCode) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [])
  return keyPressed
}

export default useKeyPress