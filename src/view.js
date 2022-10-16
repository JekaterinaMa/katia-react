//import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import useLoadData from "./useLoadData";
import ProductsByMonthView from "./ProductByMonthView";
import View2 from "./View2";
// Latest version 2022 - 10 -16


const View = () => {
    console.log("Begin view ");
            
    const date = new Date();
    let dateString = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString();
    let [ChosenDate,setChosenDate] = useState(dateString);
    let [ChosenYear,setChosenYear] = useState(date.getFullYear().toString());    
    let MonthArray = [1,2,3,4,5,6,7,8,9,10,11,12];
    let KeyID = 0;
    let [ChosenMonth1,setChosenMonth1] = useState("1");
    let [ChosenMonth2,setChosenMonth2] = useState("1");              
            

    const {data, isPending, failed, SDateArray, SYearArray, MonthProductList, SChosenMonthSet} = useLoadData("http://localhost:8000/products",ChosenMonth1, ChosenMonth2, ChosenYear);
    console.log("what useLoadData returned in view Month product list, Chosen Month set");
    console.log(MonthProductList);
    console.log(SChosenMonthSet);     
    
    
    let handleChangeYear = (e) => {
            setChosenYear(e.target.value);             
            }
            
    let handleChangeMonth1 = (e) => {
            setChosenMonth1(e.target.value);             
            } 

    let handleChangeMonth2 = (e) => {
        setChosenMonth2(e.target.value);             
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
                <select onChange={handleChangeMonth1}>
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
            <span> - </span>
            <div className="view-select">
                <select onChange={handleChangeMonth2}>
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
            <View2 ChosenMonthSet={SChosenMonthSet} ChosenYear={ChosenYear} MonthProductListView2={MonthProductList}/>
        </div>           
    </div>
     );
}
 
export default View;