 import React from "react";

 const withErrorHandler =(WrappedComponent) => {
     
    return (
        <WrappedComponent {...props}/>
    )
 };
 export default withErrorHandler;