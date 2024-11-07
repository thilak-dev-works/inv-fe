import React from "react";

const TitleBoard = ({ title, subtitle, image }) => {
    return (
        <div className='home-inventoryheader'>
            <img src={image} className='home-titleicon' alt={title} />
            <div className='home-titlebox'>
                <div className='text-title'>{title}</div>
                <div className='text-subtitle'>{subtitle}</div>
            </div>
        </div>
    )
}

export default TitleBoard;