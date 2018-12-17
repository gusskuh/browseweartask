import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker  } from "react-google-maps"
import {MarkerWithLabel} from "react-google-maps/lib/components/addons/MarkerWithLabel";

const ReactMap = withScriptjs(withGoogleMap( (props) => {
    return (
        
            <GoogleMap 
                defaultZoom={17}
                center={props.center}
            >
                 {props.isMarkerShown && <MarkerWithLabel
                    position={props.center}
                    labelAnchor={props.center}
                    labelStyle={{backgroundColor: "rgba(255, 255, 255, 0.555)",
                                 fontWeight:"bold", 
                                 fontSize: "14px", 
                                 padding: "10px", 
                                 color:"red", 
                                }}
                    >
                    <div>
                        <div>{props.selectedCompany}</div>
                        <div>{props.selectedAddress}</div>
                    </div>    
                 </MarkerWithLabel>}
            </GoogleMap>
        
    )
}))

export default ReactMap