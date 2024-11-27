import React from 'react'


function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function TotalCard({ title, number, icon }) {
  const Icon = icon
  return (
    <div className='card'>
       <div className='card-left'>
          <i style={{fontSize:13}}>{title}</i>
          <p style={{color:'#3498db'}}>{numberWithCommas(number)}</p>
       </div>
       <div className='card-right'>
         <span><Icon style={{color:'#fff'}}/></span>
       </div>
    </div>
  )
}

export default TotalCard