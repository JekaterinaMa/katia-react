import { useState, useEffect} from "react";


const useLoadData = (url,ChosenDate) => {

    const [data, setData] = useState(null);
    const [isPending, setPending] = useState(true); 
    const [failed, setFailed] = useState(null);

    let AllDate = [];
    let DateSet = [];
    let DateArray =[];

    let [DateArrayState,setDateArray] = useState(DateArray);
    let [ProductList,setProductList] = useState([]);
    let [MonthProductList,setMonthProductList] = useState([]);

    function FindDate(product) {
        if (product.purchaseDate === ChosenDate) {
           return { 
                    name: product.name,
                    price: product.price,
                    discount: product.discount,
                    id: product.id
                   }  
        }
    }

    function FindMonth(product) {
        const chosenMonth = ChosenDate.split("-");
        const productMonth = product.purchaseDate.split("-");
        if ((chosenMonth[1] === productMonth[1]) && (chosenMonth[0] === productMonth[0])) {
           return { 
                    name: product.name,
                    price: product.price,
                    discount: product.discount,
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
                        DateArray.push(date);                              
                    } 
                setDateArray(DateArray);
                setProductList(data.filter(FindDate));
                setMonthProductList(data.filter(FindMonth))
                console.log(" useLoadData ProductList  after then code: "+ ProductList+" and ChosenDate "+ChosenDate);
            })
            .catch(err=>{
                console.log(`Network error catched: ${err.message}`);
                setPending(false); 
                setFailed(err.message);
            }) 
                 
        }, [url,ChosenDate]);         
     
     return { data, isPending, failed, DateArrayState, ProductList, MonthProductList }
}
 
export default useLoadData;