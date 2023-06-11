import React from 'react'
import './style.css'

type Props = {
  message?: string
}

const Loader: React.FC<Props> = ({ message }) => {
  return (
    <div className='loader__overlay'>
      <div className='loader__wrapper'>
        <div className='loader__spinner'></div>
        {message && <p className='loader__message'>{message}</p>}
      </div>
    </div>
  )
}

export default Loader