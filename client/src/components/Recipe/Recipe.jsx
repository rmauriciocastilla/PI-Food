import React from "react";
import './Recipe.css';
import { Link } from "react-router-dom";

export default function Recipe({id,name,summary,healthScore,image,steps,diets}){
    return(
        <Link className="link" to={`/detail/${id}`}>
            <div id={id}>
                <h3>{name}</h3>
                <img src={image} alt={name}/>
                {/* <div>
                    Dietas:
                    {diets.length && diets.map(diet=>(
                        <p>{diet}</p>
                    ))}
                </div> */}
                {
                    diets.length?
                        <div className="diets-container">
                            <h4>Diets:</h4>
                            <div className="diets-recipe"> 
                        {diets.map(diet=>(
                            <p className="diet-recipe">{diet}</p>
                            ))}
                        </div>
                    </div>:<div>No hay dietas</div>
                }
            </div>
        </Link>
    )
}

{/* <div>
                Summary:
                <p dangerouslySetInnerHTML={{ __html: summary }}></p>
            </div> */}

            // <p>Health Score: {healthScore}</p>
            
            // <p>Steps: {steps}</p>
            