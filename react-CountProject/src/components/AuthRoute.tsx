// 封装高阶组件
// 有token 正常跳，没有token 去登录页
import { getToken } from "../utils";
import { Navigate  } from "react-router-dom";
export function AuthRoute({children}) {
    const token = getToken()
    if (token) {
        return <>{children}</>
    }else {
        // replace 替换，重定向
        return <Navigate to="/login" replace/>
    }
}