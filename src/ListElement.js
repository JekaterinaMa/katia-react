import { useState, useEffect} from "react";
const ListElement = ({products,clicked,submitted}) => {

    console.log(" List Element mounted  ");
    const [SPriceSum,SetPriceSum] = useState(0);

    useEffect(()=>{
        let PriceSum = 0;
        products.reverse();
        products.forEach(product => {
            PriceSum = PriceSum + Number(product.price);   
            });
            SetPriceSum(PriceSum);

    },[products,submitted])    

    return ( 
        <div>
        <div className="title"> <h1>Price sum  {SPriceSum.toFixed(2)} </h1> </div> 
        {products && products.map((product) =>(
            <div key={product.id}>
              <div className="one-product" onClick={()=>clicked(product)}>
                <div className="column60"><div className="date">{ product.purchaseDate }</div></div>
                <div className="column40right"><div className="date">{ product.place }</div></div>               

                <div className="product-row">
                    
                    <div className="column60">
                         { product.KeyName }  { product.AdditionalInf } 
                    </div>
                    <div className="column20right">
                         { product.price } 
                    </div> 
                    <div className="column20right">
                         { product.quantity } 
                    </div>                                    
                    
                </div>

                <div className="discount-row">
                    <div className="column20right">
                         { (Number(product.price) - Number(product.discount)).toFixed(2) } 
                    </div> 
                    <div className="column40">
                         nuolaida :   
                    </div>               
                    <div className="column20right">                                     
                        { product.discount } 
                    </div>
                </div>

              </div>               
            </div>
            ))
        }
        </div>

     );
}
 
export default ListElement;