//import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import useLoadData from "./useLoadData";
import ProductsByDateView from "./ProductByDateView";
import ListElement from "./ListElement";
import View2 from "./View2";



const View = () => {
    console.log("Begin view ");        
    const date = new Date();
    let dateString = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString();
    let [ChosenDate,setChosenDate] = useState(dateString);
    let KeyID = 0;

    const {data, isPending, failed, DateArrayState, ProductList, MonthProductList} = useLoadData("http://localhost:8000/products",ChosenDate);        
       
    
    let handleChange = (e) => {
        setChosenDate(e.target.value);
        console.log(" Target Value handle change "+ e.target.value);        
        console.log(" Chosen Date in handle change "+ ChosenDate);
        console.log(" ProductList in handle change "+ ProductList);     
        }  
              
    
               
   return ( 
    <div>        
        {failed && <div className="product-list-background"> {failed} </div>}
        {isPending && <div className="product-list-background">Fetching products from ... </div>}
        <div className="column1">
        {DateArrayState && 
            <div className="view-select">
                <select onChange={handleChange}>
                    {  
                        DateArrayState.map(date => (      
                                <option
                                     key={KeyID++}
                                     value={date}>
                                         {date}
                                </option>                  
                        )) 
                    }          
                </select>
            </div> 
        }
            <div>
            {ProductList && <ProductsByDateView ProductsByDate={ProductList}/>}   
            </div>
        </div>
        <div className="column2">
            <View2 ChosenDateTrigger={ChosenDate} MonthProductListView2={MonthProductList}/>
        </div>           
    </div>
     );
}
 
export default View;