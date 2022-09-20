//import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import useLoadData from "./useLoadData";
import ProductsByMonthView from "./ProductByMonthView";
import View2 from "./View2";



const View = () => {
    console.log("Begin view ");
            
    const date = new Date();
    let dateString = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString();
    let [ChosenDate,setChosenDate] = useState(dateString);
    let [ChosenYear,setChosenYear] = useState(date.getFullYear().toString());
    let [ChosenMonth,setChosenMonth] = useState((date.getMonth()+1).toString());
    let MonthArray = [1,2,3,4,5,6,7,8,9,10,11,12];
    let KeyID = 0;

    const {data, isPending, failed, SDateArray, SYearArray, DayProductList, MonthProductList} = useLoadData("http://localhost:8000/products",ChosenMonth ,ChosenYear, ChosenDate );        
    console.log(" View MonthProductList after useLoadData:"+ MonthProductList);   
    
    let handleChangeYear = (e) => {
            setChosenYear(e.target.value);             
            }
            
    let handleChangeMonth = (e) => {
            setChosenMonth(e.target.value);             
            } 

    let handleChangeDate = (e) => {
            setChosenDate(e.target.value);             
            }  
              
    
               
   return ( 
    <div className="background"> 
        <div className="border-view"></div>       
        {failed && <div className="product-list-background"> {failed} </div>}
        {isPending && <div className="product-list-background">Fetching products from ... </div>}
        <div className="column1">
        {SYearArray && 
            <div className="view-select">
                <select onChange={handleChangeYear}>
                    {  
                        SYearArray.map(year => (      
                                <option
                                     key={KeyID++}
                                     value={year}>
                                         {year}
                                </option>                  
                        )) 
                    }          
                </select>
            </div> 
        }        
            <div className="view-select">
                <select onChange={handleChangeMonth}>
                    {  
                        MonthArray.map(month => (      
                                <option
                                     key={KeyID++}
                                     value={month}>
                                         {month}
                                </option>                  
                        )) 
                    }          
                </select>
            </div> 
        
            <div>
            {MonthProductList && <ProductsByMonthView ProductsByMonth={MonthProductList}/>}   
            </div>
        </div>
        <div className="column3">
            s
        </div>
        <div className="column2">
            <View2 ChosenMonth={ChosenMonth} ChosenYear={ChosenYear} MonthProductListView2={MonthProductList}/>
        </div>           
    </div>
     );
}
 
export default View;