import React from 'react'

const Type = ({
  children, style, className 
}) => (
  <div style={ style } className={`relative flex items-center justify-center max-w-max max-h-max text-container font-semibold text-xl ${className}`} >
    <h1 className='text-top' >{children}</h1>
    <h1 className='text-white' >{children}</h1>
    <h1 className='text-bot' >{children}</h1>
  </div>
)

export default Type;