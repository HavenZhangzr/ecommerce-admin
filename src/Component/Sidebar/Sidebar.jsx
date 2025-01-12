import React from 'react' // 这是导入 React 库的默认导出（export default）
import './Sidebar.css'    // 这是导入一个 CSS 文件，没有使用大括号，因为它导入的是一个文件资源，而不是 JavaScript 的导出值
import {Link} from 'react-router-dom'// 这里导入的是 react-router-dom 中的一个命名导出（export）。react-router-dom 中有多个导出（例如 Link、Route、BrowserRouter 等），你可以选择需要的部分来导入。
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Product List</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
