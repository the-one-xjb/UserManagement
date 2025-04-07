import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'

import { useChannel } from '@/hooks/useChannel'
import { getChannelAPI,createArticleAPI } from '@/apis/article'


const { Option } = Select

const Publish = () => {
  // 获取频道列表
  const { channelList } = useChannel()
  // 提交表单
  const onFinish = async (formValue:any) => {
    const { title, content, channel_id } = formValue
    // 按照接口文档，提交的数据格式
    const reqData = {
      title,
      content,
      cover: {
        type: 0 ,// 封面模式
        // 这里的url处理逻辑只是在新增时候的逻辑
        // 编辑的时候需要做处理
        images: [] // 图片列表
         // 图片列表
      },
      channel_id
    }
    // 调用接口，提交文章
    createArticleAPI(reqData)
  }
  const [imageList,setImageList] = useState()
  // 上传图片
  const onChange = (info:any) => {
    console.log('正在上传' +info)
    setImageList(info.fileList)
  }
  // 切换封面类型,状态驱动
  const [imageType,setImageType] = useState(1)
  const onTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('value',e)
    setImageType(e.target.value)
  }
  
    return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            // { title: `${articleId ? '编辑' : '发布'}文章` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          // form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* value属性用户选中之后会自动收集起来作为接口的提交字段 */}
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type" onChange={onTypeChange}>
              <Radio.Group >
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
              listType: 决定选择文件框的外观样式
              showUploadList: 控制显示上传列表
            */}
            {imageType > 0 && <Upload
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name='image'
              onChange={onChange}
              // maxCount={imageType}
              // fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}


export default Publish
