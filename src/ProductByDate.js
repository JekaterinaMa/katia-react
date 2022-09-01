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
            PlaceSet[product.place] = [...PlaceSet[product.place],{name: product.name, price: product.price, discount: product.discount, place: product.place}]       } 
            else {
            PlaceSet[product.place] = [{name: product.name, price: product.price, discount: product.discount, place: product.place}];
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
                      name: product.name,
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
                          <div className="product-column">
                              <div>{product.name}</div>
                              <div>nuolaida</div>
                          </div>            
                          <div className="price-column">
                              <div>{product.price}</div>
                              <div>{product.discount}</div>
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