import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    /*
    在 React 中，状态是通过 useState 和 setState（或者这里的 setImage）来管理的。当你调用 setImage 时：
    1. setImage 函数会触发 React 更新组件的状态。
    2.React 会将 image 状态的值更新为 e.target.files[0]。
    3.更新后的 image 会触发组件的重新渲染。
    4.在重新渲染后的组件中，image 会是新的值 e.target.files[0]。
    */
    const [image, setImage] = useState(false); 

    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })

    /*
    只有 <input type="file"> 元素才能触发文件选择对话框。浏览器将文件选择框与 <input type="file"> 元素绑定，以允许用户选择本地文件。
    所以代码中，使用 <label> 来关联 <input> 元素，目的是为了让用户通过点击 <img> 来触发 <input type="file"> 的文件选择对话框。
    */
    const imageHandler = (e) => {
        /*
        e.target.files: 这是一个 FileList 对象，包含了用户通过 <input type="file"> 元素选择的所有文件。它是一个类似数组的对象，可以通过索引访问单个文件。
        FileList 是一个由浏览器提供的对象，它是 e.target（即 <input type="file">）的一个属性。用户通过文件选择框选择文件时，文件就会存储在这个 FileList 中。
        e.target.files[0].name // 例如 "image.jpg"
        下面的URL.createObjectURL(image):会生成一个临时的对象 URL，可以在浏览器中显示该文件
        */
        setImage(e.target.files[0]);
    }

    /*
    1. 用户输入时触发 onChange 事件：
    当用户在输入框中键入内容时，浏览器会触发 onChange 事件。onChange={setProductDetails} 会调用 setProductDetails 函数，并传入事件对象（e）。
    2. setProductDetails 更新状态：
    在 setProductDetails 函数内部，你通常会更新 React 的 productDetails 状态
    setProductDetails 会触发 React 状态更新的过程，这意味着 productDetails.name 会被设置为用户输入的值。
    注意：e.target.value 中的 .value 与 <input> 元素的 value 属性是不同的。e.target.value 是 事件对象 中包含的值，它代表了 用户输入框中的当前值。每次用户输入字符时，e.target.value 就会更新，反映出当前输入框的内容。
    <input> 的 value 属性 是 React 的状态值，它将 React 中的状态（比如 productDetails.name）绑定到输入框。React 控制这个属性的值来保证输入框内容与状态同步。
    总结：
    value={productDetails.name} 是 React 控制输入框显示内容的方式。它保证了输入框的内容与 React 状态保持同步，确保在组件重新渲染时，输入框显示最新的值。
    如果没有这种绑定，React 就无法在状态更新时确保输入框的内容更新为最新的状态值，输入框的内容会依赖于浏览器自身的 DOM 控制，可能导致不一致或丢失用户输入的情况。
    所以，通过 React 的状态来更新输入框的值，是为了确保组件的显示内容和状态同步，以及 React 可以正确管理用户的输入内容。
    如果不绑定 value，React 在重新渲染时不知道用户在输入框中输入了什么值，从而在虚拟 DOM 和浏览器的 DOM 之间的比对过程中 无法准确反映用户的输入。
    完全正确！涉及到页面输入的元素（例如 <input>、<textarea>、<select>），如果你想让 React 完全控制这些元素的值并保持状态与 UI 的同步，就需要绑定 value 属性，让它们成为 受控组件。
    在表单提交或其他事件中，可以直接从状态读取输入值，而不是依赖浏览器的 DOM。
    3. React 重新渲染组件：
    当 productDetails 状态更新后，React 会重新渲染组件。在这个过程中，React 会比较当前的虚拟 DOM 和更新后的虚拟 DOM，
    发现 productDetails.name 的值已更新，因此它会重新渲染包含 value={productDetails.name} 的 <input> 元素。
    4. value={productDetails.name} 更新输入框内容：
    在组件重新渲染时，value={productDetails.name} 会被赋值为最新的 productDetails.name。这意味着输入框的值会更新为用户输入的新内容。
    */
    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }

    const Add_Product = async ()=> {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:4000/upload',{
            method: 'POST',
            headers: {
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responseData=data})
        /*
        区别总结：
        JSON.parse()：
        用于将一个已经存在的 JSON 字符串（如从文件或本地存储中获取的）转换成 JavaScript 对象。
        必须手动调用，且需要提供一个字符串作为输入。

        resp.json()：
        用于从 Fetch API 获取的响应中提取 JSON 数据并自动解析为 JavaScript 对象。
        只需要调用，不需要手动处理字符串。
        返回一个 Promise，因此需要通过 then() 或 await 来获取解析后的数据。
        什么时候使用：
        JSON.parse() 用于处理你手动获取的 JSON 字符串。
        resp.json() 用于处理通过 fetch API 获取的响应体中的 JSON 数据。
        */

        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json', // 表示请求体的数据格式是 JSON。
                },
                body: JSON.stringify(product), // fetch 发送请求时需要请求体数据是字符串格式，而 JSON 格式字符串是标准的网络传输格式。
                /*
                1. 客户端向服务器发送数据：
                当客户端需要向服务器发送JSON格式的数据时，必须将其转换为 JSON字符串 格式。因为在HTTP请求中，数据需要作为字符串传输，而JSON格式数据是对象或数组，需要通过 JSON.stringify() 方法将其转换成字符串。
                2.服务器返回数据给客户端：
                服务器返回的数据通常是 JSON字符串 格式。HTTP响应的正文部分（body）通常是一个JSON格式的字符串。因此，当客户端接收到服务器的响应后，它需要使用 JSON.parse() 方法将该字符串解析成 JavaScript 对象（即转换成 JSON 格式）。
                */
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alter("Failed")
            })
        }
    }



  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name='name' value={productDetails.name} onChange={changeHandler} placeholder='Type here'/>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input type="text" name="old_price" value={productDetails.old_price} onChange={changeHandler} placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input type="text" name="new_price" value={productDetails.new_price} onChange={changeHandler} placeholder='Type here'/>
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select name="category" value={productDetails.category} onChange={changeHandler} className="add-product-selector">
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
        </label>
        <input onChange = {imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick = {()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
