import React, { useState, useEffect } from 'react';

const AddProductForm = ({clicked, submitted}) => {
    console.log("AddProductForm component begin");
    const date = new Date();
    let dateString = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString();
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [place, setPlace] = useState("iki");
    const [price, setPrice] = useState("1.50");
    const [discount, setDiscount] = useState("0.79");
    const [purchaseDate, setPurchaseDate] = useState(dateString);
    const [isPending, setPending] = useState(false);

    useEffect(()=>{  
        if (clicked)   {
            setName(clicked.name);
        }      
                    },[clicked])


    const handleSubmit = (e) => {
        e.preventDefault();                       
        submitted();        
        const product = { name, quantity, place, price, discount, purchaseDate } ;
        setPending(true);

      fetch("http://localhost:8000/products",
      {
          method: "POST",
          headers: {"Content-Type":"application/json" },
          body: JSON.stringify(product)
      })
      .then(()=>{
          setPending(false)
                  })     

    }

    const handleChange = (e) =>{
        setName(e.target.value);  
    }

    return ( 
        <div className='add-form' id="borderScrew">
            <form onSubmit = {handleSubmit}>
                <div className='add-form-purchaseDate'>                
                    <label> Product name </label>                
                    <input 
                    name="ProductName"
                    type="text" 
                    required value = {name} 
                    onChange={(e)=>handleChange(e)} />                
                </div>
                <div>                    
                    <div className='add-form-column'>
                    <label> Product quantity </label>
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