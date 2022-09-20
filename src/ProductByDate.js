import React, { useState, useEffect } from 'react';
const ProductByDate = ({ProductsByMonth,Date}) => {
  
  const [PlaceProductList, setPlaceProductList] = useState([]);
  let KeyID=0;
  
  useEffect(()=>{

    let DateProductList = [];
    DateProductList = ProductsByMonth.filter(productListFilter);  

    let PlaceSet = {}, PlaceSetArray = [];

    DateProductList.forEach(product => {
            if (PlaceSet[product.place]) {
            PlaceSet[product.place] = [...PlaceSet[product.place],{KeyName: product.KeyName, AdditionalInf: product.AdditionalInf, price: product.price, discount: product.discount, place: product.place, id: product.id}]       } 
            else {
            PlaceSet[product.place] = [{KeyName: product.KeyName, AdditionalInf: product.AdditionalInf, price: product.price, discount: product.discount, place: product.place, id: product.id}];
            }
        });
 
    for (let place in PlaceSet) {    
        PlaceSetArray.push(PlaceSet[place]);
    }

    setPlaceProductList(PlaceSetArray);

  },[ProductsByMonth])  
  

    let productListFilter = (product) =>
    {
      
        if (product.purchaseDate === Date) {
          
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
     

    return ( 
        <div>
          <div className="title">{Date}</div>
            {PlaceProductList && PlaceProductList.map((place)=>(
              <div key={KeyID++}>
                <div className="product-row">{place[0].place}</div>                  
                    {place.map((product)=>(
                      <div key={product.id} className="ProductByDate-row">
                        <div className="clearfix">
                          <div className="column60">
                              <div>{product.KeyName}  {product.AdditionalInf}</div>
                              <div>nuolaida  {product.discount}</div>
                          </div>            
                          <div className="column20right">
                              <div>{product.price}</div>
                              <div>{(Number(product.price) - Number(product.discount)).toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                  ))}
                                  
              </div>
            ))}
            
        </div>
     );
}
 
export default ProductByDate;