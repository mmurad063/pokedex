import { useState } from 'react'

function App() {
  const [count,setCount]=useState(0) // [0,func()]
  const [mode, setMode]=useState(false)

  
   function increment() {
    
    const newCount = count + 1
     setCount(newCount)
  
  }
  function decrement() {
    const newCount = count- 1
    setCount(newCount)
  }
   
   function handleMode() {
    const newMode = !mode
    setMode(newMode)
   }
  
  console.log(mode) 

  return (
    <div style={{padding:"20px",border:"1px solid gray",transition:"all.5s",backgroundColor:mode ? "#000": "#fff",color:mode ? "#fff": "#000"}}>
    <button onClick={handleMode}>Toggle Mode</button>
    <button onClick={decrement}>Descrement</button>
    <h1>{count}</h1>
    <p>{count>10? "More than":"Less than"}</p>

    <button onClick={increment}>Increment</button>
    </div>
  )
}

export default App 