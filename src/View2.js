import { useEffect, useState } from "react";
import LoadProducts from "./LoadProducts";

const View2 = ({ChosenDateTrigger, MonthProductListView2}) => {

    console.log("View 2 begin");
    console.log(" Chosen Date in view 2 "+ ChosenDateTrigger);
    let month = ChosenDateTrigger.split("-");

    const [SMonth, setMonth] = useState("choose date");
    const [Smin, setSMin] = useState(0);
    const [Smax, setSMax] = useState(0);
    const [SdiscountSum, setSdiscountSum] = useState(0);
    const [SpriceSum, setSpriceSum] = useState(0);
    const [SQuantity, setSQuantity] = useState(null);
    

    
    
    
    useEffect(()=>{ 
        setMonth(month[1]);
        var min={}, max={}, discountSum=0, priceSum=0;
        min.min = 1000;
        max.max = 0;
        let quantity = {}, quantity2 = [];
        console.log("Use Effect in view2 started");        
        
            MonthProductListView2.forEach(product=>{
                if (Number(product.price) < min.min) {
                    console.log(" min.min "+ min.min);
                    min = {
                        min: Number(product.price),
                        name: product.name,
                        price: product.price,
                        discount: product.discount,
                        purchaseDate: product.purchaseDate
                    }
                    
                }
                if (Number(product.price) > max.max) {
                    max = {
                        max: Number(product.price),
                        name: product.name,
                        price: product.price,
                        discount: product.discount,
                        purchaseDate: product.purchaseDate
                    }
                    
                }
                if (quantity[product.name])
                {
                    quantity[product.name].quantity++;
                    product.quantity=quantity[product.name];
                }
                else {
                    quantity[product.name]= {quantity: 1, name: product.name, price: product.price, id: product.id};                    
                    product.quantity=quantity[product.name];
                }
                discountSum = discountSum + Number(product.discount);        
                priceSum = priceSum + Number(product.price);
                               
            })
            for (let product in quantity) {
                console.log("quantity parameters " +product+ " kiekis "+quantity[product].quantity);
                if (quantity[product].quantity>1) {
                    quantity2.push({name: product, quantity: quantity[product].quantity, price: quantity[product].price})
                    console.log("quantity2 " +quantity2+ " kiekis ");
                }                
            }
            setSdiscountSum(discountSum.toFixed(2));
            setSpriceSum(priceSum);
            setSMax(max);
            setSMin(min);
            setSQuantity(quantity2);                          
                
        console.log("Use Effect in view 2 ended");              
     },[ChosenDateTrigger,MonthProductListView2])

     

    return (<div>
        
        {MonthProductListView2 && 
        <div >
            <h1 className="view2"> Statistics for {SMonth}th month:</h1>
            <h1 className="view2"> Least expensive product {Smin.min}  {Smin.name}</h1>
            <h1 className="view2"> Most expensive product  {Smax.max}  {Smax.name} </h1>
            <h1 className="view2"> Discount sum      {SdiscountSum} </h1>
            <h1 className="view2"> Product price sum  {SpriceSum}  </h1>
            {SQuantity && SQuantity.map(ProductName=>(
               <div key={ProductName.id}>{ProductName.name}  {ProductName.quantity}</div>
            ))}            
        </div>}

    </div> );
}
 
export default View2;