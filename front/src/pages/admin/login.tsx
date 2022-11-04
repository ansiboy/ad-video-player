import React from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

import 'antd/dist/antd.css'
import { paths } from '../../common'
import './login.scss'
import { login } from '../../services/user'

export default function LoginPage () {
  let navigate = useNavigate()

  const onFinish = (values: any) => {
    console.log('Success:', values)
    login(values).then(res => {
      if (res.token) {
        localStorage.setItem('token', res.token)
        navigate(paths.admin.edit)
      }
    })
  }

  return (
    <div className='login-wrap'>
      <div className='login'>
        <div className='login-title'>登录</div>

        <div className='login-content'>
          <Form name='login' onFinish={onFinish} autoComplete='off'>
            <Form.Item
              name='username'
              rules={[{ required: true, message: '请输入登录账号!' }]}
            >
              <Input
                placeholder='请输入登录账号'
                prefix={<UserOutlined className='site-form-item-icon' />}
              />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                { required: true, message: '请输入登录密码!' },
                { max: 16, message: '密码长度在6-16位之间' },
                { min: 6, message: '密码长度在6-16位之间' }
              ]}
            >
              <Input.Password
                placeholder='请输入登录密码'
                prefix={<LockOutlined className='site-form-item-icon' />}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{ marginTop: 10, width: '100%' }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
