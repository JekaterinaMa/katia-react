import React, { useState, useEffect } from 'react';

const AddProductForm = ({clicked, submitted}) => {
    console.log("AddProductForm component begin");
    const date = new Date();
    let dateString = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString();
    const [KeyName, setKeyName] = useState("");
    const [AdditionalInf, setAdditionalInf] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [place, setPlace] = useState("iki");
    const [price, setPrice] = useState("1.50");
    const [discount, setDiscount] = useState("0.79");
    const [purchaseDate, setPurchaseDate] = useState(dateString);
    const [isPending, setPending] = useState(false);

    useEffect(()=>{  
        if (clicked)   {
            setKeyName(clicked.KeyName);
            setAdditionalInf(clicked.AdditionalInf);
            setQuantity(clicked.quantity);
            setPrice(clicked.price);
            setDiscount(clicked.discount);
        }      
                    },[clicked])


    const handleSubmit = (e) => {
        e.preventDefault();                       
                
        const product = { KeyName, AdditionalInf, quantity, place, price, discount, purchaseDate } ;
        setPending(true);

      fetch("http://localhost:8000/products",
      {
          method: "POST",
          headers: {"Content-Type":"application/json" },
          body: JSON.stringify(product)
      })
      .then(()=>{
          setPending(false);
          submitted();
                  })     

    }    

    return ( 
        <div className='add-form' id="borderScrew">
            <form onSubmit = {handleSubmit}>
                <div className='add-form-purchaseDate'>
                    <div className="dropdown">                
                        <label> Product keyword </label>
                        <div className="dropdown-content">
                            Word by which your purchase will be grouped. If it is "milk drink" do you want it in "milk" or "drink" category or whole new "milk drink" category ? 
                        </div>
                    </div>                
                    <input 
                    name="ProductName"
                    type="text" 
                    required value = {KeyName} 
                    onChange={(e)=>setKeyName(e.target.value)} />         
                </div>
                <div className='add-form-purchaseDate'>
                    <div className="dropdown">                
                        <label> additional information </label>
                        <div className="dropdown-content">
                           Not important for sorting information like brand name, flavour, size. More like memo
                        </div>
                    </div>                
                    <input 
                    name="ProductName"
                    type="text" 
                    required value = {AdditionalInf} 
                    onChange={(e)=>setAdditionalInf(e.target.value)} />         
                </div>
                <div>                    
                    <div className='add-form-column'>
                        <div className="dropdown">
                            <label> Product quantity </label>
                            <div className="dropdown-content">
                                Quantity of ONE package in kg, liters or unit number
                            </div>
                        </div>
                    <input type="number" 
                    required value = {quantity} 
                    onChange={(e)=>setQuantity(e.target.value)} />                 
                    </div>
                    <div className='add-form-column'>
                    <label> Purchase place name </label>
                    <input type="text" 
                    required value = {place} 
                    onChange={(e)=>setPlace(e.target.value)} />                 
                    </div>
                </div>
                <div>
                    <div className='add-form-column'>
                    <label> Product price </label>
                    <input type="number" 
                    required value = {price} 
                    onChange={(e)=>setPrice(e.target.value)} />
                    </div>
                    <div className='add-form-column'>
                    <label> Product discount </label>
                    <input type="number" 
                    required value = {discount} 
                    onChange={(e)=>setDiscount(e.target.value)} />
                    </div>
                </div>
                <div className='add-form-purchaseDate'>
                    <label> Purchaise date </label>
                    <input type="text" 
                    maxLength="10"
                    required value = {purchaseDate} 
                    onChange={(e)=>setPurchaseDate(e.target.value)} />
                </div>                
                {!isPending && <button> Submit </button>}
                {isPending && <button disabled> Processing </button>}
            </form>

        </div>

     );
}
 
export default AddProductForm;