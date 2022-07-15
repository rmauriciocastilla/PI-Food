import React from "react";
import { Link } from "react-router-dom";
import './Landing.css';

export default function Landing(){
    return(
        <div className="landing-container">
                <h1 className="h1-landing">Foody App🍱</h1>
                <Link className="link-landing" to='/home'>Ingresar</Link>
        </div>
    )
}