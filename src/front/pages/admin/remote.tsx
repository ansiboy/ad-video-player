import { Button, Checkbox, Form, Input, Row, Col, Switch, message } from 'antd'
import React, { useState } from 'react'
import {
  startRemoteController,
  stopRemoteController
} from '../../services/user'

const key = 'remoteControllers'

export default function RemotePage () {
  const [checked, setChecked] = useState<boolean>(false)
  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete='off'
      style={{ width: 600, marginLeft: 10, marginTop: 20 }}
    >
      <Form.Item label='运行远程登录' valuePropName='checked'>
        <Switch
          checked={checked}
          onChange={e => {
            message.loading({
              content: e ? '开启中...' : '关闭中...',
              key,
              duration: 0
            })

            if (e) {
              startRemoteController()
                .then(res => {
                  message.success({ content: '开启成功!', key, duration: 2 })
                  setChecked(e)
                })
                .catch(err => {
                  message.error({ content: '开启失败!', key, duration: 2 })
                })
            } else {
              stopRemoteController()
                .then(res => {
                  message.success({ content: '关闭成功!', key, duration: 2 })
                  setChecked(e)
                })
                .catch(err => {
                  message.error({ content: '关闭失败!', key, duration: 2 })
                })
            }
          }}
        />
      </Form.Item>
      <Form.Item label='远程地址'>http://47.243.143.36:42986</Form.Item>
    </Form>
  )
}
