import { useEffect, useState } from "react";
import LoadProducts from "./LoadProducts";

const View2 = ({ChosenMonth, ChosenYear, MonthProductListView2}) => {

    console.log("View 2 begin");
    
    const [SMonth, setMonth] = useState(ChosenMonth);
    const [Smin, setSMin] = useState(0);
    const [Smax, setSMax] = useState(0);
    const [SdiscountSum, setSdiscountSum] = useState(0);
    const [SpriceSum, setSpriceSum] = useState(0);
    const [SQuantity, setSQuantity] = useState(null);
    const [SClicked, setClicked] = useState(0);
    let KeyID=0;
       
   
    useEffect(()=>{ 
        
    switch (SClicked) {
        case 0:
            console.log("Use Effect in view2 started calculations");
            var min={}, max={}, discountSum=0, priceSum=0;        
            min.min = 1000;
            max.max = 0;
            let quantity = {};
            let quantity2 = [];              
        
            MonthProductListView2.forEach(product=>{
                if (Number(product.price) < min.min) {
                    console.log(" min.min "+ min.min);
                    min = {
                        min: Number(product.price),
                        KeyName: product.KeyName, 
                        AdditionalInf: product.AdditionalInf,
                        price: product.price,
                        discount: product.discount,
                        purchaseDate: product.purchaseDate
                    }
                    
                }
                if (Number(product.price) > max.max) {
                    max = {
                        max: Number(product.price),
                        KeyName: product.KeyName, 
                        AdditionalInf: product.AdditionalInf,
                        price: product.price,
                        discount: product.discount,
                        purchaseDate: product.purchaseDate
                    }
                    
                }
                if (quantity[product.KeyName])
                {
                    quantity[product.KeyName].quantity++;
                    product.quantity=quantity[product.KeyName];
                    quantity[product.KeyName].price = (Number(quantity[product.KeyName].price) + Number(product.price)).toFixed(2);
                    quantity[product.KeyName].priceWithDiscount = (Number(quantity[product.KeyName].priceWithDiscount) + (Number(product.price)-Number(product.discount))).toFixed(2);
                }
                else {
                    let priceWithDiscount = (Number(product.price)-Number(product.discount)).toFixed(2);
                    quantity[product.KeyName]= {quantity: 1, 
                                                KeyName: product.KeyName, 
                                                price: product.price, 
                                                priceWithDiscount: priceWithDiscount, 
                                                id: product.id};                    
                    product.quantity=quantity[product.KeyName];
                }
                discountSum = discountSum + Number(product.discount);        
                priceSum = priceSum + Number(product.price);                               
            })
            for (let product in quantity) {
                let AvgPriceDiscount = (quantity[product].priceWithDiscount/30).toFixed(2);
                let AvgMonthPrice = (quantity[product].price/30).toFixed(2);
                quantity2.push({name: product, 
                                quantity: quantity[product].quantity, 
                                price: quantity[product].price, 
                                priceWithDiscount: quantity[product].priceWithDiscount, 
                                AvgPrice: AvgMonthPrice, 
                                AvgPriceWithDiscount: AvgPriceDiscount})
                                    
            }
            setSdiscountSum(discountSum.toFixed(2));
            setSpriceSum(priceSum.toFixed(2));
            setSMax(max);
            setSMin(min);
            quantity2.sort(function(a,b){return b.AvgPriceWithDiscount-a.AvgPriceWithDiscount});
            setSQuantity(quantity2);
            break;
        case 1:            
            console.log(SQuantity);
            break;
        case 2:            
            console.log(SQuantity);
            break;            

        }
        console.log("Use Effect in view 2 ended"); 
                      
     },[MonthProductListView2,SClicked])

        let HandleButtWithDisc = () => { 
            let quantity2 = SQuantity;
            setSQuantity(quantity2.sort(function(a,b){return b.AvgPriceWithDiscount-a.AvgPriceWithDiscount}));            
            setClicked(1);        
        }

        let HandleButtWithoutDisc = () => {
            let quantity2 = SQuantity;
            setSQuantity(quantity2.sort(function(a,b){return b.AvgPrice-a.AvgPrice}));
            setClicked(2);        
        } 

     

    return (<div>
        
        {MonthProductListView2 && 
        <div >
            <div className="title" id="borderScrew"><div className="space-left"></div>Statistics for {ChosenYear} {SMonth}th month:</div>
            <div className="title2 inline"> <h1>Price sum  {SpriceSum} </h1> </div>
            <div className="title2 inline"> <h1>Discount sum  {SdiscountSum}</h1> </div>
            <div className="title2 inline">sort by:<div className="space-left"></div>
                <button onClick={HandleButtWithDisc}>with discount</button>   <button onClick={HandleButtWithoutDisc}>without discount</button>
            </div>
            <div className="view2-table"> Least expensive product {Smin.min}  {Smin.KeyName}</div>
            <div className="view2-table"> Most expensive product  {Smax.max}  {Smax.KeyName} </div>
            
            
            {SQuantity && SQuantity.map(ProductName=>(
                <div key={KeyID++} className="view2-table">
                    <div className="clearfix">
                        <div className="column50">  {ProductName.name} : {ProductName.quantity} vnt </div>
                        <div className="column20left"> spent {ProductName.price}  </div>
                        <div className="column28left">  {ProductName.AvgPrice} per day </div>
                    </div>
                    <div className="clearfix">
                        <div className="column50">  with discount applied </div>
                        <div className="column20left"> spent {ProductName.priceWithDiscount}  </div>
                        <div className="column28left">  {ProductName.AvgPriceWithDiscount} per day </div>
                    </div>
                    
                </div>
            ))}            
        </div>}

    </div> );
}
 
export default View2;