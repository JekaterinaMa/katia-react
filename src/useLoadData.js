import { useState, useEffect} from "react";


const useLoadData = (url,ChosenMonth1,ChosenMonth2,ChosenYear) => {

    console.log(" useLoadData begin ");

    const [data, setData] = useState(null);
    const [isPending, setPending] = useState(true); 
    const [failed, setFailed] = useState(null);

    let AllDate = [];
    let DateSet = [];
    let YearSet = [];
    let DateArraySet =[];    
    let YearArray = [];
    let ChosenMonthSet = [];
    let [SChosenMonthSet,setChosenMonthSet] = useState([]);
    

    let [SDateArray,setDateArray] = useState(DateArraySet);
    let [SYearArray,setYearArray] = useState(YearSet);    
    let [MonthProductList,setMonthProductList] = useState([]);
    
    function ChosenMonthSetF(month1, month2) {
        if ((month2-month1)<0) {
            for (let i = month2; i<month1; i++){
                ChosenMonthSet.push(i);                
            }
        }
        if ((month2-month1)>=0) {
            for (let i = month1; i<=month2; i++){
                ChosenMonthSet.push(i);
            }
        }
    }

    
    function FindMonth(product) {
        
        const productMonth = product.purchaseDate.split("-");
        let TrueProduct = {};
        ChosenMonthSet.forEach(month => {
            
            if ((month == productMonth[1]) && (ChosenYear == productMonth[0])) {                
                TrueProduct = { 
                    KeyName: product.KeyName,
                    AdditionalInf: product.AdditionalInf,
                    place: product.place,
                    price: product.price,
                    discount: product.discount,
                    purchaseDate: product.purchaseDate, 
                    id: product.id
                   }
             }
        });
        return Object.keys(TrueProduct).length !== 0;
        
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
                ChosenMonthSetF(ChosenMonth1,ChosenMonth2);
                setChosenMonthSet(ChosenMonthSet); 
                console.log("chosen month set calculated ");
                console.log(ChosenMonthSet);                
                setMonthProductList(data.filter(FindMonth));
                console.log(" useLoadData MonthProductList :");
                console.log(MonthProductList);
                
            })
            .catch(err=>{
                console.log(`Network error catched: ${err.message}`);
                setPending(false); 
                setFailed(err.message);
            }) 
                  
        }, [url,ChosenMonth1,ChosenMonth2,ChosenYear]);         
        console.log(" useLoadData end ");
     return { data, isPending, failed, SDateArray, SYearArray, MonthProductList, SChosenMonthSet }
}
 
export default useLoadData;