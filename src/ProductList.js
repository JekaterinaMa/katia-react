import { useState } from "react";
import AddProduct from './AddProduct';
import ListElement from "./ListElement";
import useFetch from "./useFetch";

const ProductList = () => {
    console.log(" ProductList begin ")
    var [submitted, setSubmitted] = useState(false);
    const [clickedProduct, setClickedProduct] = useState(null);
    const {data, isPending, failed } = useFetch("http://localhost:8000/products", submitted);
    const products = data;
        
    const HandleSubmit = () => {        
       setSubmitted(!submitted);       
    }

    const ProductClicked = (product) => {
        setClickedProduct(product);
        console.log(product);
    }
     
    return (
        <div className="background">
            <div className="column1">            
            {failed && <div className="product-list-background"> {failed} </div>}
            {isPending && <div className="product-list-background">Fetching data from ... </div>}            
            {products && <ListElement items={products} clicked={ProductClicked} />}
            </div>
            <div className="column2">
                <AddProduct submitted={HandleSubmit} clicked={clickedProduct}/>
                
            </div>
            
        </div>
     );
}
 
export default ProductList;