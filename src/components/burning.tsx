import React from 'react';
import './burning.css'

export default function Burning() {
    return(
        <div className="wrapper">
            <div className="flame-wrapper">
                <div className="flame red"></div>
                <div className="flame orange"></div>
                <div className="flame gold"></div>
                <div className="flame white"></div>
                <div className="base blue"></div>
                <div className="base black"></div>
            </div>
        </div>
    )
}

