import React, { useState, useEffect } from 'react';

function ChildComponent() {
  useEffect(() => {
    console.log('ChildComponent mounted!');

    return () => {
      console.log('ChildComponent unmounted!');
    };
  });

    

  return <div>I am the child component!</div>;
}

function ParentComponent() {

  const [beneficiary, setBeneficiary] = useState([{}])


  const handleAddBeneficiary = ()=>{
    setBeneficiary((prev)=> [...prev, {name: "", email: ""}])
  }

  const handleName = (e, index)=>{
    const value = e.target.value
    const updated = [...beneficiary]
    updated[index] = {...updated[index], name:value}
    setBeneficiary(updated)
  }

  const handleEmail = (e, index)=>{
    const value = e.target.value
    const updated = [...beneficiary]
    updated[index] = {...updated[index], email:value}
    setBeneficiary(updated)
  }

  


  const renderBeneficiaryForm = (beneficiary, index)=>{


    return(
      <div style={{border: "1px solid red", width: "300px", margin:"15px"}} key={index}>
        <div>
          <label htmlFor="">Name</label>
          <input type="text" value={beneficiary.name || ""}  onChange={(e)=>handleName(e, index)}/>
        </div>

        <div>
          <label htmlFor="">Email</label>
          <input type="email" value={beneficiary.email || ""}  onChange={(e)=>handleEmail(e, index)}/>
        </div>

      </div>
    )

  }



  return (
    <div>
      <button onClick={handleAddBeneficiary}>Add Beneficiary</button>
      {
        beneficiary.map((beneficiary, index) => renderBeneficiaryForm(beneficiary, index))
      }
    </div>
  );
}

export default ParentComponent;

