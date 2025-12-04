import { useState,useRef } from "react";

function App() {
  const inputRef = useRef();

  const[toDo,setToDo] = useState([]);

  console.log(toDo);

  const handleAddtoDo = () => {
    console.log(inputRef.current.value);

    const value = inputRef.current.value
 
    if(value.trim()==""){
      alert("Empty input")
    }
    const newtoDo=[...toDo,value]

    setToDo(newtoDo)
  };
  const handleRmvEl=(i) =>{console.log("item-index",i)
  const newtoDo=toDo.filter((item,index)=>index!==i)
     setToDo(newtoDo);}


  return (
    <div>
      <input ref={inputRef} defaultValue="Oyun" />
      <button onClick={handleAddtoDo} disabled={toDo.length >=10}>Add</button>
      <ul>
        {toDo.map((item,index) => <li key={"todo-item-"+{index}}
        style={{cursor:"pointer"}}
        onClick={()=>handleRmvEl(index)}
        >
        {index+1} {item}
       </li>)}
     </ul>
    </div>
  );
}
export default App 