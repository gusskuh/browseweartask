import React from 'react';


const Companies = (props) => {
    
    
        return (
            <div  className="list-container">
               {props.data.map((Company, i) => {
                    let classType = ''
                    if (Company === props.selectedCompany) classType += 'selected'
                   return(<div onClick={props.setCompany.bind(this, Company)} className={classType} key={i}><p>{Company}</p></div>)
               })}
            </div>
        )
    

    
}

export default Companies;
