
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/common/Navbar/Navbar'
import Cart from './components/common/Cart/Cart'
import { useState } from 'react'

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleVisibilityCart = () => {
    setIsCartVisible(!isCartVisible)
  }

  return (
    <>
      <Navbar updateCartVisible={toggleVisibilityCart}/>

      <main>
        <Outlet/>
      </main>

      <Cart isVisible={isCartVisible}/>
    </>
  )
}

export default App
