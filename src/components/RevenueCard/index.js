import React from 'react'

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

function RevenueCard({ title, number, icon }) {
    const Icon = icon

  return (
    <div className='card'>
    <div className='card-left'>
       <h3><i>{title}</i></h3>
       <p style={{color:'#3498db'}}>KES {numberWithCommas(number)}</p>
    </div>
    <div className='card-right'>
      <span><Icon style={{color:'#fff'}}/></span>
    </div>
 </div>
  )
}

export default RevenueCard