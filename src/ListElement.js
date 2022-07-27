const ListElement = (props) => {
    const products = props.items;
    products.reverse();
    let PriceSum = 0;
    
        products.forEach(product => {
            PriceSum = PriceSum + Number(product.price);   
        });

     
    console.log(" List Element mounted  "+PriceSum.toFixed(2));

    return ( 
        <div>
        <div className="title"> <h1>Price sum  {PriceSum.toFixed(2)} </h1> </div> 
        {products && products.map((product) =>(
            <div key={product.id}>
              <div className="one-product" onClick={()=>props.clicked(product)}>
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