### request 请求模块
- axios：
  一样接口，但是可以配置请求头，请求拦截器，响应拦截器
  使用request 进行请求，再统一进行导出
- redux 管理token
  多模块进行共享，redex 方便状态共享
  安装：
  npm i react-redux @reduxjs/toolkit


## login 并且跳转
- const onFinish = async (values: any) => {
      await dispatch(fetchLogin(values))
      // 跳转页面
      navigate('/')
      // 提示
      message.success('登录成功')
    }
- token持久化
  redux 基于浏览器存储，现在使用了localStorage 进行存储
    initialState:{
        token:localStorage.getItem('token_key') || '' // 后端string类型
    },
    reducers:{
        setToken:(state,action)=>{
            state.token = action.payload // paload 载荷赋值给token
            localStorage.setItem('token_key',action.payload)
        },
    }
- token 封装存取删方法
  多模块，共享复用
- axios 请求拦截器注入token
  多个接口以token 为依据，进行请求；
  在axios 请求体注入token，自动携带
- 使用token 进行路由权限控制
  
## 初始化样式
- npm i normalize.css
- html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  #root {
    height: 100%;
  }

## 高亮和跳转
- 二级路由
  onClick={onMenuClick} 点击,根据key 进行跳转
  const onMenuClick = (route) => {
    console.log('菜单被点击了', route)
    const path = route.key
    navigate(path)
  }
- 反向高亮
  const location = useLocation() // 获取当前路径
  console.log(location.pathname)
  const selectedkey = location.pathname
  再绑定到菜单上menu
  selectedKeys={[selectedkey]}
- 使用antd 菜单组件

## 渲染用户信息
- 安装：npm i react-redux @reduxjs/toolkit
- redux 里面的reducers 对象，包含的方法，用于createSlice 创建动作对象，被store 调用，触发状态更新
- 完成渲染，const name = useSelector(state => state.user.userInfo.name)

## 退出登录
- 提示是否真退出
  <Popconfirm
    title="是否确认退出？"
    okText="退出"
    cancelText="取消"
    onConfirm={onConfirm}>
    <LogoutOutlined /> 退出
  </Popconfirm>
- 绑定onConfirm 事件，回到登录页
  const onConfirm = async () => {
    await dispatch(fetchLogout())
    navigate('/login')
  }
- 清除token
- @ react别名
- cra 在webpack 中配置代理，采用插件 -craco 进行配置
- npm i -D @craco/craco


## 图表
- echart 图表
- 安装：npm i echarts
- 引入：import * as echarts from 'echarts'
- 渲染：
  const option = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
  }
  const myChart = echarts.init(document.getElementById('main'))
- 封装，不同的使用props 进行适配
  1. 获取渲染图表的dom节点
  const chartDom = chartRef.current

- 所有业务接口进行封装到api
  axios 封装
- 13800000002
- 246810

## 富文本编辑器
- {/* value属性用户选中之后会自动收集起来作为接口的提交字段 */}
  {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
- 收集表单
  使用form 组件收集，封装到hooks 中，按照接口处理表单数据
- {/* 
    listType: 决定选择文件框的外观样式
    showUploadList: 控制显示上传列表
  */}
- upload 上传：action配置接口地址；
  name 接口字段名
  // 状态枚举
  const status = {
    1: <Tag color='warning'>待审核</Tag>,
    2: <Tag color='success'>审核通过</Tag>,
  }
  {
      title: '状态',
      dataIndex: 'status',
      // data - 后端返回的状态status 根据它做条件渲染
      // data === 1 => 待审核
      // data === 2 => 审核通过
      render: data => status[data]
    },
    render 渲染,按照status

- onFinish 
- formValue.date[0].format('YYYY-MM-DD'),
4. 重新拉取文章列表 + 渲染table逻辑重复的 - 复用
    // reqData依赖项发生变化 重复执行副作用函数 

## 路由懒加载
- 路由懒加载
  const Home = lazy(() => import('@/pages/Home'))
  element: <Suspense fallback={'加载中'}><Home /></Suspense>
- "analyze": "source-map-explorer 'build/static/js/*.js'" 
  进行打包分析
- cdn优化
  就近原则，体积大非业务js文件 放在cdn 上
  