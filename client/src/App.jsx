import { useState } from 'react'
import './App.css'

import {Navbar, Footer,PaymentJumbotron, Transactions, ParticlesContainer} from "./components";

const App = ()=> {
  const [count, setCount] = useState(0)

  return (
 
    <div className="min-h-screen">
    <div className="gradient-bg-welcome">
            
         <Navbar/>
         <PaymentJumbotron/>
         <Transactions/>
    </div>
    
         <Footer/>  
   </div>
 
  )
}

export default App
