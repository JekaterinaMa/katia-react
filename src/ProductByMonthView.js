import ProductByDate from "./ProductByDate";
import React, { useState, useEffect } from 'react';

const ProductsByMonthView = ({ProductsByMonth}) => {
    console.log(" ProductsByMonthView begin argument: "+ProductsByMonth);
    let DateSet = {}, DateSetArray = [];
    let KeyID = 0;  
    
    
    ProductsByMonth.forEach(product => {
       if (DateSet[product.purchaseDate]) {
        DateSet[product.purchaseDate] = [...DateSet[product.purchaseDate],{KeyName: product.KeyName, AdditionalInf: product.AdditionalInf, price: product.price, discount: product.discount, purchaseDate: product.purchaseDate}]       } 
       else {
        DateSet[product.purchaseDate] = [{KeyName: product.KeyName, AdditionalInf: product.AdditionalInf, price: product.price, discount: product.discount, purchaseDate: product.purchaseDate}];
       }
    });

    for (let date in DateSet) {
        DateSetArray.push(date);
    } 
    DateSetArray.sort(function(a,b){
        let x = Number(a.split("-")[2]);
        let y = Number(b.split("-")[2]);
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    })

    

   
    return ( 
        <div>            
            {
                DateSetArray && DateSetArray.map((date)=>(
                <div key={KeyID++}>                                            
                    { ProductsByMonth &&   <ProductByDate ProductsByMonth={ProductsByMonth} Date={date}/>   }                
                </div>
                ))
            }       
        </div>
     );

}
 
export default ProductsByMonthView;