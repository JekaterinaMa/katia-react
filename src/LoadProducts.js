//import { useState, useEffect } from "react";
const LoadProducts = () => {
    const promise = new Promise((resolve)=>{
    fetch("http://localhost:8000/products")
    
    .then(resource => { 
        if (!resource) {
            throw Error("No corresponding data found (access denied, wrong endpoint)")
        }
        return resource.json();
     })
    .then(data => {             
      resolve(data);
                               
    })
    .catch(err=>{
        console.log(`Network error catched: ${err.message}`);        
    })

    })   
    return (promise)              
    
}
 
export default LoadProducts;