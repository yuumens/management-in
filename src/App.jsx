import { Route, Routes } from 'react-router'
import './App.css'
import Navbars from './components/navbar/navbar'
import homepage from './pages/homepage'
import AddProductPage from './pages/addproductpage'


function App() {

  return (
    <div>
      <Navbars/>
    <Routes>
      <Route path='/listproduct' Component={homepage}></Route>
      <Route path='/addproduct' Component={AddProductPage}></Route>
    </Routes>
    </div>
  )
}

export default App
