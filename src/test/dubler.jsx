import { useRef, useState } from "react";

 function NumberDoubler () {
  const numberRef = useRef(1);   

  const [displayNumber, setDisplayNumber] = useState(numberRef.current);

  const handleDouble = () => {
    numberRef.current = numberRef.current * 2; 
    setDisplayNumber(numberRef.current);     
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Current Number: {displayNumber}</h2>
      <button onClick={handleDouble}>Double Number</button>
    </div>
  );
}

export default NumberDoubler