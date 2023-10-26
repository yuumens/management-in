import { Route, Routes } from 'react-router'
import './App.css'
import homepage from './pages/homepage'
import AddProductPage from './pages/addproductpage'


function App() {

  return (
    <div>
    <Routes>
      <Route path='/' Component={homepage}></Route>
      <Route path='/addproduct' Component={AddProductPage}></Route>
    </Routes>
    </div>
  )
}

export default App
