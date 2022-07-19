import React from "react";
import './Recipe.css';
import { Link } from "react-router-dom";

export default function Recipe({id,name,image,diets}){
    return(
        <a className="link" href={`/detail/${id}`}>
                <h2 className="name-recipe">{name}</h2>
                <div className="image-container">
                    <img src={image} alt={name}/>
                </div>
                {
                    diets.length?
                        <div className="diets-container">
                            <h4>Diets:</h4>
                            <div className="diets-recipe"> 
                        {diets.map(diet=>(
                            <p className="diet-recipe">{diet}</p>
                            ))}
                        </div>
                    </div>:<div className="diets-container">There are no diets</div>
                }
        </a>
    )
}
            