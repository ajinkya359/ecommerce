import React from 'react';
import {Card} from "@material-ui/core";
import './ProductPage.css'
export  default function ProductCard() {
    return(
        <div className="Card" onClick={()=>console.log("Clickef")}>
            <div className="product-name">
                Iphone
            </div>
            <div className="product-image">
                <img src= {require('../productImage/iphone.jpeg')}></img>
            </div>
            <div className="product-price">
                $560
            </div>
        </div>
    )
}