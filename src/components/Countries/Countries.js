import React from 'react';


const Countries = (props) => {
    
    
        return (
            <div  className="list-container">
               {props.data.map((country, i) => {
                    let classType = ''
                    if (country[0] === props.selectedCountry) classType += 'selected'                     
                   return(<div onClick={props.setCountry.bind(this, country[0])}className={classType} key={i}><p >{country[0]}</p></div>)
               })}
            </div>
        )
    

    
}

export default Countries;
