import { useState } from "react";
import AddProduct from './AddProduct';
import ListElement from "./ListElement";
import useFetch from "./useFetch";

const ProductList = () => {
    console.log(" ProductList begin ")
    const [submitted, setSubmitted] = useState(false);
    const [clickedProduct, setClickedProduct] = useState(null);
    const {data, isPending, failed, loaded } = useFetch("http://localhost:8000/products", submitted);
    const products = data;
    console.log(" ProductList after use Fetch "+loaded);

    const HandleSubmit = () => {        
       setSubmitted(!submitted);
       console.log(" Submitted in Handle submit "+submitted);       
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
                {data && <ListElement products={products} clicked={ProductClicked} submitted={loaded} />}
            </div>
            <div className="column2">
                {products && <AddProduct submitted={HandleSubmit} clicked={clickedProduct}/>}
                
            </div>
            
        </div>
     );
}
 
export default ProductList;