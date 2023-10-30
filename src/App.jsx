import { Route, Routes } from 'react-router'
import './App.css'
import homepage from './pages/homepage'
import AddProductPage from './pages/addproductpage'
import EditProductPage from './pages/editproductpage'
import Chatbot from './components/openAI/openai'


function App() {
  return (
    <div>
    <Routes>
      <Route path='/' Component={homepage}></Route>
      <Route path='/addproduct' Component={AddProductPage}></Route>
      <Route path='/editproduct/:productId' Component={EditProductPage}></Route>
      <Route path='/chatbot' Component={Chatbot}></Route>
    </Routes>
    </div>
  )
}

export default App
