import { useState, useEffect} from "react";


const useLoadData = (url,ChosenMonth,ChosenYear,ChosenDate) => {

    console.log(" useLoadData begin ");

    const [data, setData] = useState(null);
    const [isPending, setPending] = useState(true); 
    const [failed, setFailed] = useState(null);

    let AllDate = [];
    let DateSet = [];
    let YearSet = [];
    let DateArraySet =[];    
    let YearArray = [];

    let [SDateArray,setDateArray] = useState(DateArraySet);
    let [SYearArray,setYearArray] = useState(YearSet);
    let [DayProductList,setDayProductList] = useState([]);
    let [MonthProductList,setMonthProductList] = useState([]);

    function FindDate(product) {
        if (product.purchaseDate === ChosenDate) {
           return { 
                    KeyName: product.KeyName,
                    AdditionalInf: product.AdditionalInf,
                    place: product.place,
                    price: product.price,
                    discount: product.discount,
                    id: product.id
                   }  
        }
    }

    function FindMonth(product) {
        
        const productMonth = product.purchaseDate.split("-");
        if ((ChosenMonth === productMonth[1]) && (ChosenYear === productMonth[0])) {
           return { 
                    KeyName: product.KeyName,
                    AdditionalInf: product.AdditionalInf,
                    place: product.place,
                    price: product.price,
                    discount: product.discount,
                    purchaseDate: product.purchaseDate, 
                    id: product.id
                   }  
        }
    }

          useEffect(()=>{
              
            fetch(url)
            .then(resource => { 
                if (!resource) {
                    throw Error("No corresponding data found (access denied, wrong endpoint)")
                }
                return resource.json();
             })
            .then(data => {
                 setData(data); 
                 setPending(false);
                 setFailed(null);
                 
                 AllDate = data.map(product =>product.purchaseDate);
                 DateSet = new Set(AllDate);
                    for (const date of DateSet.values()) {  
                        const year=date.split("-")             
                        DateArraySet.push(date);
                        YearArray.push(year[0]);                              
                    } 
                 YearSet = new Set(YearArray);
                 YearArray = [];
                    for (const year of YearSet.values())
                    {
                        YearArray.push(year); 
                    }
                setYearArray(YearArray);
                setDateArray(DateArraySet);
                setDayProductList(data.filter(FindDate));
                setMonthProductList(data.filter(FindMonth));
                console.log(" useLoadData MonthProductList :"+MonthProductList);
                
            })
            .catch(err=>{
                console.log(`Network error catched: ${err.message}`);
                setPending(false); 
                setFailed(err.message);
            }) 
                 
        }, [url,ChosenMonth,ChosenYear,ChosenDate]);         
     
     return { data, isPending, failed, SDateArray, SYearArray, DayProductList, MonthProductList }
}
 
export default useLoadData;