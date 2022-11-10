import React, { FC, ReactNode } from 'react'
import './model-image.scss'

interface Props {
  loadAgain: boolean
  onLoad: () => void
  children?: ReactNode
}

const LoadAgain: FC<Props> = props => {
  const { loadAgain, children } = props
  return (
    <>
      {loadAgain ? (
        <div className='load-wrap'>
          <div className='load'>
            网络加载错误，请<a onClick={() => props.onLoad()}>重试</a>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}
export default LoadAgain
