import { useState, useEffect} from "react";


const useFetch = (url, submitted) => {

    const [data, setData] = useState(null);
    const [isPending, setPending] = useState(true); 
    const [failed, setFailed] = useState(null);

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
                 console.log(" UseFetch in async part ");
            })
            .catch(err=>{
                console.log(`Network error catched: ${err.message}`);
                setPending(false); 
                setFailed(err.message);
            }) 
            console.log(" UseFetch data after async function code ");      
        }, [url, submitted]);         
     
     return { data, isPending, failed }
}
 
export default useFetch;