import React from 'react';

const Robot = ( { imgUrl, name, handleLoading } ) => {
  return(
    <div className="robot">
      <img src={`${imgUrl}.png`} onLoad={handleLoading}/>
      <h1>{name}</h1>
    </div>
  )
}

export default Robot;