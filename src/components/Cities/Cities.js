import React from 'react';

const Cities = (props) => {

    
    
    return (
        <div className="list-container">
               {props.data.map((city, i) => {
                   let classType = 'city'
                   if (city[0] === props.selectedCity) classType += ' selected'
                   return(<div className={classType} onClick={props.setCity.bind(this, city[0])} key={i}><p>{city[0]}</p></div>)
               })}
            </div>
        )
    

}

export default Cities;
