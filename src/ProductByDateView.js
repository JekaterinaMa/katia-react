const ProductsByDateView = ({ProductsByDate}) => {
    ProductsByDate && console.log("Product by date element begin, argument ProductsByDate[1].id passed: "+ProductsByDate)
    return ( 
        <div>
            {
                ProductsByDate && ProductsByDate.map((Product)=>(
                <div key={ProductsByDate.id}>
                    <div className="product-row">
                        <div className="product-column">{Product.name}</div>
                        <div className="price-column">{Product.price}</div>
                    </div>
                    <div className="discount-row">
                        <div className="product-column">nuolaida</div>
                        <div className="price-column">{Product.discount}</div>
                    </div>
                </div>
                ))
            }       
        </div>
     );

}
 
export default ProductsByDateView;