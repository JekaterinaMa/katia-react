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
                <div className="date">{ product.purchaseDate }</div>

                <div className="product-row">
                    
                    <div className="product-column">
                         { product.name } 
                    </div>
                    
                    <div className="price-column">
                         { product.price } 
                    </div> 
                    
                </div>

                <div className="discount-row">
                    <div className="product-column">
                         nuolaida   
                    </div>               
                    <div className="price-column">                                     
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