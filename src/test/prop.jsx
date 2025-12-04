import Header from "./Compiler/Header.jsx";
import ProductCard from "./Components/Productcard/ProductCard.jsx";
import { Product} from "./Product.jsx"
import { currentTime } from "./utils/date.js";
import {Button} from "./Compiler/Button";
import productsData from "./data/products.json";
function App() {
 console.log("productsData",productsData)
 
  const date = currentTime();
 const name = "Javad";
 const age = 15
 const list=[1,2,3,4,5];

  const myPerson ={
    name:"Rahim",
    age: 25,
    job:"Developer"
  };
 
function alertUser () {
  alert(`Hello ${name}! Current time is ${date} `) ;
}

const isWorking = true;


return (
   <div >
    <Header/>
      <div>
       <h1>Welcome to My App : {name}</h1>
       <p>Current Time: {date}</p>
       <button onClick={alertUser}>Show alert</button>
       <Button variant="danger" showArrow>Click me</Button>
       <Button size="small" variant="success" disabled  >Another button</Button>
       <Button size="large" variant="success" >Another Button</Button>

      </div>
      <Product name={name} 
               list={list} 
               age={age} 
               myPerson={myPerson} 
               isWorking={isWorking}
               sayUserAlert={alertUser}
                >
                  {productsData.map(product => (
                    <ProductCard key={product.id} product={product}/>

                
                  ))}
          
          </Product>
    <div>
      <p>This is simple React application</p>
      </div>
    </div>
  )
}
    
export default App