import { Button, Empty, message, Modal, Space, Tooltip } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import UploadImage from './uploadImage'
import './model-image.scss'
import { getAllList } from '../../../services/user'
import { imagePath } from '../../../utils/utils'

interface Props {
  visible: boolean
  type: 'video' | 'image'
  onOk: (value: string[]) => void
  onCancel: () => void
  isRadio?: boolean
  data: string[]
}

interface Item {
  value: string
  checked: boolean
}

const ModelImage: FC<Props> = props => {
  const { visible, type, onCancel, onOk, isRadio = false, data = [] } = props

  const [list, setList] = useState<Item[]>([])

  useEffect(() => {
    getList()
  }, [])

  /**
   * 将数据转换
   * @date 2022-11-07
   * @param {any} arr:string[]
   * @returns {any}
   */
  const handleData = (arr: string[]): Item[] => {
    const getImagesList: Item[] = arr.reduce(
      (prev: Item[], curr: string): Item[] => {
        let obj = {
          value: '',
          checked: false
        }
        if (data.includes(curr)) {
          obj.checked = true
        }
        obj.value = curr
        prev.push(obj)
        return prev
      },
      []
    )
    return getImagesList
  }

  /**
   * 获取图片/视频数据
   * @date 2022-11-07
   * @returns {any}
   */
  const getList = async () => {
    getAllList(type).then(res => {
      const overData = handleData(res)
      setList(overData)
    })
  }

  return (
    <>
      <Modal
        open={visible}
        destroyOnClose
        title={`选择${type === 'video' ? '视频' : '图片'}`}
        onCancel={onCancel}
        width={800}
        bodyStyle={{
          height: 500,
          overflowY: 'auto'
        }}
        footer={
          <div className='modal-footer'>
            <UploadImage
              type={type}
              onOk={(info, isExist: boolean = false) => {
                let arr: Item[] = JSON.parse(JSON.stringify(list))
                if (!isExist) {
                  let obj = {
                    checked: false,
                    value: info
                  }
                  arr.unshift(obj)
                }
                setList(arr)
              }}
              onBefore={name => {
                return list.map(item => item.value).includes(name)
              }}
            />

            <Space size={12} style={{ marginLeft: 'auto' }}>
              <Button onClick={onCancel}>取消</Button>
              <Button
                type='primary'
                onClick={() => {
                  const value = list
                    .filter(item => item.checked)
                    .map(item => item.value)
                  if (!value.length) {
                    message.warning(
                      `请至少选择一个${type === 'image' ? '图片' : '视频'}`
                    )
                    return
                  }

                  onOk(value)
                }}
              >
                确定
              </Button>
            </Space>
          </div>
        }
      >
        <div className='model-items'>
          {list.length ? (
            list.map(item => (
              <div
                key={item.value}
                className={item.checked ? 'model-item active' : 'model-item'}
                onClick={() => {
                  const arr: Item[] = JSON.parse(JSON.stringify(list))
                  if (!isRadio) {
                    arr.map(o => {
                      if (o.value === item.value) o.checked = !o.checked
                    })
                  } else {
                    arr.map(o => {
                      o.checked = false
                      if (o.value === item.value) {
                        o.checked = !o.checked
                      }
                    })
                  }
                  setList(arr)
                }}
              >
                <Tooltip title={item.value}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    {type === 'image' ? (
                      <img src={imagePath(item.value)} alt='' />
                    ) : (
                      <video src={imagePath(item.value)}></video>
                    )}
                  </div>
                </Tooltip>
              </div>
            ))
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={`暂无${type === 'image' ? '图片' : '视频'}`}
            />
          )}
        </div>
      </Modal>
    </>
  )
}
export default ModelImage
