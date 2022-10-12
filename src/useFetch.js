import { useState, useEffect} from "react";


const useFetch = (url, submitted) => {

    
    const [data, setData] = useState(null);
    const [isPending, setPending] = useState(true); 
    const [failed, setFailed] = useState(null);
    const [loaded, setLoaded] = useState(false);
    console.log(" useFetch begin  "+submitted+" "+loaded);

          useEffect(()=>{
              
            fetch(url)
            .catch(err=>{
                console.log(`JSON is empty: ${err.message}`);  
            })
            .then(resource => { 
                if (!resource) {
                    console.log("JSON is empty")
                    throw Error("No corresponding data found (access denied, wrong endpoint)")
                }
                return resource.json();
             })
            .then(data => {
                 setData(data); 
                 setPending(false);
                 setFailed(null);
                 setLoaded(!loaded);
                 console.log(" UseFetch in async part ");
                 console.log(data[data.length-1].id);
            })
            .catch(err=>{
                console.log(`Network error catched: ${err.message}`);
                setPending(false); 
                setFailed(err.message);
            }) 
                  
        }, [url, submitted]); 

    console.log(" UseFetch end ");
     return { data, isPending, failed, loaded }
}
 
export default useFetch;