import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log(values)

    // 检查手机号和密码
    const { mobile, code } = values
    try {
      const response = await fetch(`http://localhost:7001/user?username=${mobile}`)
      const result = await response.json()

      if (result.status === 200) {
        if (result.data.password === code) {
          // 触发异步action fetchLogin
          await dispatch(fetchLogin(values))
          // 1. 跳转到首页
          navigate('/')
          // 2. 提示一下用户
          message.success('登录成功')
        } else {
          message.error('密码错误，请重新输入')
        }
      } else {
        message.error('用户不存在，请检查手机号')
      }
    } catch (error) {
      console.error('请求失败:', error)
      message.error('登录失败，请稍后重试')
    }
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="mobile"
            // 多条校验逻辑 先校验第一条 第一条通过之后再校验第二条
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入正确的手机号格式'
              }
            ]}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
