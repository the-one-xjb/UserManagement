// 和用户相关的状态管理

import { createSlice } from '@reduxjs/toolkit'
import { setToken as _setToken, getToken, removeToken } from '@/utils'
import { loginAPI, getProfileAPI } from '@/apis/user'

const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    setToken (state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setUserInfo (state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo (state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  }
})


// 解构出actionCreater

const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// 获取reducer函数

const userReducer = userStore.reducer

// 登录获取token异步方法封装
const fetchLogin = (loginForm:any) => {
  return  async(dispatch:any) => {
    try{
      const res = await loginAPI(loginForm)
      console.log(res);
      dispatch(setToken(res.data.token))
    } catch (err) {
      console.log(err)
    }
  }
}

// 获取个人用户信息异步方法
const fetchUserInfo = () => {
  return async (dispatch:any) => {
    try{
      const res = await getProfileAPI()
      console.log(res);
      dispatch(setUserInfo(res.data))
    }catch(err){
      console.log(err)
    }
  }
}

export { fetchLogin, fetchUserInfo, clearUserInfo }

export default userReducer