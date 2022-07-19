import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {getDetails} from "../../redux/actions";
import { Link } from "react-router-dom";
import './DetailRecipe.css';

export default function DetailRecipe({match}){
    let id = match.params.id;
    const dispatch = useDispatch();
    const detailRecipe = useSelector(state=>state.detailRecipe);

    useEffect(()=>{
        dispatch(getDetails(id))
    },[])

    useEffect(()=>{
        document.title = detailRecipe.name
    },[detailRecipe])

    if(typeof detailRecipe === 'object'){
        if(detailRecipe.id){
        return (
            <div id = {detailRecipe.id} className="detail-container">
                <a className="form-nav-link-create fixed" href="/home">Home</a>
                <h1 className="detail-title">{detailRecipe.name}</h1>
                <div className="detail-image">
                    <img className="detail-image" src={detailRecipe.image} alt={detailRecipe.name}/>
                </div>
                <div className="detail-summary">
                    <h3>Diets:</h3>
                        {detailRecipe.diets&&detailRecipe.diets.length?
                            <div className="detail-diets">
                                {detailRecipe.diets.map(diet=>(<p key={diet}>{diet}</p>))}
                            </div>:<div>The recipes has no related diets</div>}
                </div>
                <div className="detail-summary">
                    <h3>Health Score:</h3>
                    <p className="detail-p">{detailRecipe.healthScore || detailRecipe.healthScore==0?detailRecipe.healthScore:"The recipe has no health score"}</p>
                </div>
                <div className="detail-summary">
                    <h3>Summary:</h3>   
                    <p dangerouslySetInnerHTML={{ __html: detailRecipe.summary }}></p>
                </div>

                <div className="detail-summary">
                    <h3>Steps:</h3>
                    <p>{detailRecipe.steps?detailRecipe.steps:"The recipe has no steps"}</p>
                </div>

            </div>
        )
    }
    else{
        return (
                <div className="container-loading">
                    <h2 className="container-loading-h2">Cargando receta ...</h2>
                </div>
            )
        }
    }
    else{
        return (
            <div className="container-loading">
                <a className="form-nav-link-create fixed" href="/home">Back to Home</a>
                <h2 className="container-loading-h2">❌Non-existent recipe 😖</h2>
            </div>)
    }
}