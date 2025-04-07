
import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { Provider } from 'react-redux'
import store from './store'
import 'normalize.css'

// 后面加！
const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

)


