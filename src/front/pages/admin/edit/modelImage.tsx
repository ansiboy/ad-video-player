import {
  Badge,
  Button,
  Empty,
  message,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Tooltip
} from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import React, { FC, useEffect, useState } from 'react'
import UploadImage from './uploadImage'
import './model-image.scss'
import { deleteFile, getAllList } from '../../../services/user'
import { mediaPath } from '../../../utils/utils'
import LoadAgain from './loadAgain'

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

const deleteKey = 'deleteKey'

const ModelImage: FC<Props> = props => {
  const { visible, type, onCancel, onOk, isRadio = false, data = [] } = props

  const [list, setList] = useState<Item[]>([])
  const [showDelete, setShowDelete] = useState<boolean>(false)
  const [selectData, setSelectData] = useState<string[]>(data)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadAgain, setLoadAgain] = useState<boolean>(false)

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
    setLoading(true)
    getAllList(type)
      .then(res => {
        const overData = handleData(res)
        setList(overData)
        setLoadAgain(false)
      })
      .catch(err => {
        setLoadAgain(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const deletePic = async (name: string) => {
    message.loading({ content: 'Loading...', key: deleteKey, duration: 0 })
    deleteFile(name)
      .then(res => {
        if (res.status === 200) {
          const arr = list.filter(item => item.value !== name)
          const seArr = selectData.filter(item => item !== name)
          setSelectData(seArr)
          setList(arr)
          message.success({ content: '删除成功!', key: deleteKey, duration: 2 })
        }
      })
      .catch(err => {
        message.error(err.message)
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
          overflowY: 'auto',
          position: 'relative'
        }}
        footer={
          <div className='modal-footer'>
            <Space size={20}>
              <UploadImage
                disabled={loading}
                type={type}
                onOk={(info, isExist: boolean = false) => {
                  let arr: Item[] = JSON.parse(JSON.stringify(list))
                  if (!isExist) {
                    let obj = {
                      checked: false,
                      value: mediaPath(info)
                    }
                    arr.unshift(obj)
                  }
                  setList(arr)
                }}
                onBefore={name => {
                  return list.map(item => item.value).includes(name)
                }}
              />
              <Button
                disabled={loading}
                onClick={() => {
                  setShowDelete(!showDelete)
                }}
              >
                {showDelete ? '隐藏' : '显示'}删除
              </Button>
            </Space>

            <Space size={12} style={{ marginLeft: 'auto' }}>
              <Button onClick={onCancel}>取消</Button>
              <Button
                disabled={loading}
                type='primary'
                onClick={() => {
                  if (!selectData.length) {
                    message.warning(
                      `请至少选择一个${type === 'image' ? '图片' : '视频'}`
                    )
                    return
                  }
                  onOk(selectData)
                }}
              >
                确定
              </Button>
            </Space>
          </div>
        }
      >
        <LoadAgain
          loadAgain={loadAgain}
          onLoad={() => {
            setLoadAgain(false)
            getList()
          }}
        >
          <Spin tip='Loading...' spinning={loading} delay={500}>
            <div className='model-items'>
              {list.length ? (
                list.map(item => (
                  <div
                    key={item.value}
                    className={
                      item.checked ? 'model-item active' : 'model-item'
                    }
                  >
                    {selectData.indexOf(item.value) > -1 ? (
                      <div className='model-badge'>
                        <Badge count={selectData.indexOf(item.value) + 1} />
                      </div>
                    ) : null}

                    {!item.checked && showDelete ? (
                      <Popconfirm
                        placement='topRight'
                        title={`确认删除该${
                          type === 'image' ? '图片' : '视频'
                        }？`}
                        onConfirm={() => {
                          deletePic(item.value)
                        }}
                      >
                        <div className='delete-icon'>
                          <CloseOutlined style={{ fontSize: 9 }} />
                        </div>
                      </Popconfirm>
                    ) : null}

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
                        onClick={() => {
                          const arr: Item[] = JSON.parse(JSON.stringify(list))
                          if (!isRadio) {
                            arr.map(o => {
                              if (o.value === item.value) {
                                if (o.checked) {
                                  o.checked = false
                                  const newSelectData = selectData.filter(
                                    j => j !== o.value
                                  )
                                  setSelectData(newSelectData)
                                } else {
                                  o.checked = true
                                  const newSelectData = JSON.parse(
                                    JSON.stringify(selectData)
                                  )
                                  newSelectData.push(o.value)
                                  setSelectData(newSelectData)
                                }
                              }
                            })
                          } else {
                            arr.map(o => {
                              o.checked = false
                              if (o.value === item.value) {
                                o.checked = !o.checked
                                setSelectData([o.value])
                              }
                            })
                          }
                          setList(arr)
                        }}
                      >
                        {type === 'image' ? (
                          <img src={mediaPath(item.value)} alt='' />
                        ) : (
                          <video src={mediaPath(item.value)}></video>
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
          </Spin>
        </LoadAgain>
      </Modal>
    </>
  )
}
export default ModelImage
