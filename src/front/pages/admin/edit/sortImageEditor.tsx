import React, { FC } from 'react'
import './model-image.scss'
import { Image } from 'antd'
import 'sortablejs'
import { ReactSortable } from 'react-sortablejs'

import { UnorderedListOutlined } from '@ant-design/icons'
import { mediaPath } from '../../../utils/utils'

interface Props {
  data: string[]
  onSort: (value: string[]) => void
}

const SortImageEditor: FC<Props> = props => {
  const { data } = props
  
  return (
    <ul className='sorts'>
      <ReactSortable
        list={data as any}
        setList={list => {
          props.onSort(list as any)
        }}
        handle='.sort-icon'
      >
        {data.map(item => (
          <li key={item}>
            <div className='sort-icon'>
              <UnorderedListOutlined />
            </div>
            <div className='sort-image'>
              <Image width={50} height={50} src={mediaPath(item)} alt='image' />
            </div>
            <div className='sort-text'>{item}</div>
          </li>
        ))}
      </ReactSortable>
    </ul>
  )
}
export default SortImageEditor
