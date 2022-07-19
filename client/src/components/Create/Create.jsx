import React,{useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDiets, postRecipe} from '../../redux/actions';
import "./Create.css";

export default function Create(){
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);
    
    useEffect(()=>{
        dispatch(getDiets())
    },[])
    
    const [input,setInput] = useState({
        name: "",
        summary: "",
        healthScore: 0,
        image: "",
        steps: "",
        diets: []
    })

    const [error,setError] = useState({
        name: "",
        summary: "",
        image: "",
        steps:""
    })

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        handleError(e);
    }



    function handleSubmit(e){
        e.preventDefault();

        if(error.name || error.summary || error.image || error.steps){
            console.log("no lo envie");
        }
        else{
            console.log({
                    ...input,
                    name: input.name.trim(),
                    summary: input.summary.trim(),
                    healthScore: parseFloat(input.healthScore),
                    image: input.image.trim(),
                    steps: input.steps.trim(),
                    diets: input.diets.slice().map(d=>d.id)
            })

            dispatch(postRecipe({
                ...input,
                name: input.name.trim(),
                summary: input.summary.trim(),
                healthScore: parseFloat(input.healthScore),
                image: input.image.trim(),
                steps: input.steps.trim(),
                diets: input.diets.slice().map(d=>d.id)
            }))
            
            setInput({
                name: "",
                summary: "",
                healthScore: 0,
                image: "",
                steps: "",
                diets: []
            })
            setError({
                name: "",
                summary: "",
                image: "",
                steps:"",
            })
            window.scroll(0,0)
        }
    }

    function handleClick(arr,diet,e){
        e.preventDefault();
        let newArray = arr.slice();
        if(!newArray.find(dieta=>dieta.id === diet.id)){
            newArray.push(diet)
            setInput({
                ...input,
                diets: newArray
            })    
        }
    }

    function handleClickDos(arr,diet,e){
        e.preventDefault();
        let newArray = arr.slice();
        newArray = newArray.filter(dieta => dieta.id !== diet.id);
        setInput({
            ...input,
            diets: newArray
        })
    }

    function handleError(e){
        switch(e.target.name){
            case "name":
                let name = e.target.value.trim();
                if(name.length){
                    if(/^[a-zA-Z\s]*$/.test(name)){
                        if(name.length>=5){
                            if(name.length<=20){
                                setError({
                                    ...error,
                                    name: ""
                                })
                                return;
                            }
                            else{
                                setError({
                                    ...error,
                                    name:"Maximum 20 characters"
                                })
                                return;
                            }
                        }
                        else{
                            setError({
                                ...error,
                                name: "Minimum 5 characters"
                            })
                            return;
                        }
                    }
                    else{
                        setError({
                            ...error,
                            name: "Numbers and special characters are not accepted"
                        })
                        return;
                    }
                }
                else{
                    setError({
                        ...error,
                        name:"Recipe name is required"
                    })
                    return;
                }
            case "summary":
                let summary = e.target.value.trim();
                if(summary.length){
                    if(summary.length>=20){
                        if(summary.length<=200){
                            setError({
                                ...error,
                                summary: ""
                            })
                            return;
                        }
                        else{
                            setError({
                                ...error,
                                summary: "Maximun 200 characters"
                            })
                            return;                            
                        }
                    }
                    else{
                        setError({
                            ...error,
                            summary: "Minimum 20 characters"
                        })
                        return;
                    }
                }
                else{
                    setError({
                        ...error,
                        summary: "Recipe summary is required"
                    })
                    return;
                }

            case "image":
                let image = e.target.value.trim();
                if(image.length){
                    if(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/.test(image)){
                        setError({
                            ...error,
                            image: ""
                        })
                        return;
                    }
                    else{
                        setError({
                            ...error,
                            image: "Image format: http|https://......png|jpg|gif"
                        })
                        return;
                    }
                }
                else{
                    setError({
                        ...error,
                        image: "Recipe image is required"
                    })
                    return;
                }
            case "steps":
                let steps = e.target.value.trim();
                if(steps.length){
                    if(steps.length>=20){
                        if(steps.length<=200){
                            setError({
                                ...error,
                                steps: ""
                            })
                            return;
                        }
                        else{
                            setError({
                                ...error,
                                steps: "Maximum 200 characters"
                            })
                            return;
                        }
                    }
                    else{
                        setError({
                            ...error,
                            steps: "Minimum 20 characters"
                        })
                        return;
                    }
                }
                else{
                    setError({
                        ...error,
                        steps: "Recipe steps is required"
                    })
                    return;
                }
            default:
                return;
        }
    }

    return(
        <div>
            <a className="form-nav-link-create fixed" href="/home">Home</a>
            <form onSubmit={handleSubmit} className="create-form">
                <div className="create-form-h1">
                    <h1>Create Recipe Form</h1>
                </div>
                <div className="create-form-name">
                    <label>Recipe name:
                        <input className={!error.name?"create-form-name-input":"create-form-name-input-error"} type="text" value={input.name} name="name" placeholder="Recipe name" onChange={handleChange} autoComplete="off" required/>
                    </label>
                    {error.name?<p className="p-error">{error.name}</p>:""}
                </div>
                
                <div className="create-form-summary">
                    <label>Recipe summary:</label>
                    <textarea className={error.summary?"create-form-summary-textarea-error":"create-form-summary-textarea"} type="text" value={input.summary} name="summary" placeholder="Recipe summary" onChange={handleChange} autoComplete="off" required/>
                    {error.summary?<p className="p-error">{error.summary}</p>:""}
                </div>
                
                <div className="create-form-health">
                    <label>Recipe health score:</label>
                    <div>
                        <p>{input.healthScore}</p>
                        <input type="range" value={input.healthScore} name="healthScore" min="0" max="100" onChange={handleChange}/>
                    </div>
                </div>
                
                <div className="create-form-image">
                    <label>Recipe image url:</label>
                    <input className={error.image?"create-form-image-url-error":"create-form-image-url"} type="text" value={input.image} name="image" placeholder="Recipe image url" onChange={handleChange} autoComplete="off" required/>
                    {error.image?<p className="p-error">{error.image}</p>:""}
                </div>
                
                <div className="create-form-summary">
                    <label>Step by Step:</label>
                    <textarea className={error.steps?"create-form-summary-textarea-error":"create-form-summary-textarea"} value={input.steps} name="steps" placeholder="Step by Step" onChange={handleChange} autoComplete="off" required/>
                    {error.steps?<p className="p-error">{error.steps}</p>:""}
                </div>

                <div className="form-create-diets-container">
                    Select the recipe diets:
                    <div className="form-create-diets">

                    {diets.length && diets.map(diet=>(
                        <div 
                        onClick={(e)=>handleClick(input.diets,diet,e)}
                        key={diet.id}
                        id={diet.id}
                        className="diet-form"
                        >
                            {diet.name}
                        </div>
                        
                        ))}
                    </div>
                    <div>
                    Selected diets: 
                        <div className="diets-added-container">
                        {input.diets.length?input.diets.map(dietAdd=>(
                            <div 
                            id={`${dietAdd.id}Add`}
                            key={`${dietAdd.id}Add`}
                            className="diet-form-added"
                            >
                                <p>{dietAdd.name}</p>
                                <button className="diet-form-button-remove" onClick={(e)=>handleClickDos(input.diets,dietAdd,e)}>X</button>
                            </div>
                            )):"There are no selected diets"}
                        </div>
                        
                    </div>
                </div>
                {error.name||error.summary||error.image||error.steps?<p className="p-error">Cannot create a recipe with errors</p>:""}
                <button className={error.name||error.summary||error.image||error.steps?"button-submit-container-error":"button-submit-container"} type="submit">Create</button>
            </form>
        </div>
    )
}