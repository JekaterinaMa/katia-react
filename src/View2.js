import { useEffect, useState } from "react";
import LoadProducts from "./LoadProducts";

const View2 = ({ChosenMonth, ChosenYear, MonthProductListView2}) => {

    console.log("View 2 begin");
    
    const [SMonth, setMonth] = useState("choose date");
    const [Smin, setSMin] = useState(0);
    const [Smax, setSMax] = useState(0);
    const [SdiscountSum, setSdiscountSum] = useState(0);
    const [SpriceSum, setSpriceSum] = useState(0);
    const [SQuantity, setSQuantity] = useState(null);
    let KeyID=0;   
   
    useEffect(()=>{ 
        setMonth(ChosenMonth);
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
                    quantity[product.name].price = Number(quantity[product.name].price) + Number(product.price);
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
                    let AvgMonthPrice = (quantity[product].price/30).toFixed(2);
                    quantity2.push({name: product, quantity: quantity[product].quantity, price: quantity[product].price, AvgPrice: AvgMonthPrice})
                    console.log("quantity2 " +quantity2+ " kiekis ");
                }                
            }
            setSdiscountSum(discountSum.toFixed(2));
            setSpriceSum(priceSum.toFixed(2));
            setSMax(max);
            setSMin(min);
            setSQuantity(quantity2);                          
                
        console.log("Use Effect in view 2 ended");              
     },[MonthProductListView2])

     

    return (<div>
        
        {MonthProductListView2 && 
        <div >
            <div className="title" id="borderScrew"><div className="space-left"></div>Statistics for {ChosenYear} {SMonth}th month:</div>
            <div className="date-outline"> Least expensive product {Smin.min}  {Smin.name}</div>
            <div className="date-outline"> Most expensive product  {Smax.max}  {Smax.name} </div>
            <div className="date-outline"> Discount sum      {SdiscountSum} </div>
            <div className="date-outline"> Product price sum  {SpriceSum}  </div>
            {SQuantity && SQuantity.map(ProductName=>(
                <div key={KeyID++}>
                   <div className="date-outline"> Some products you bought more than once : {ProductName.name} : {ProductName.quantity} spent {ProductName.price} on them</div>
                   <div className="date-outline"> On average you spend {ProductName.AvgPrice} per day for {ProductName.name}</div>
                </div>
            ))}            
        </div>}

    </div> );
}
 
export default View2;