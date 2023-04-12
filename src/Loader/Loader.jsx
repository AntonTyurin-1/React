import React from 'react'
import '../Loader/Loader.css'
export const Loader = () => {
   return (
      <div className="mask">
         <div className="mask__loader">
            <div className="loader"></div>
         </div>
      </div>
   )
}
