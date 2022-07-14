import React,{useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDiets, postRecipe} from '../../redux/actions';

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

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }



    function handleSubmit(e){
        e.preventDefault();
        
        dispatch(postRecipe({
            ...input,
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

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de la receta:
                        <input type="text" value={input.name} name="name" placeholder="Escriba el nombre de la receta" onChange={handleChange}/>
                    </label>
                </div>
                
                <div>
                    <label>Resumen de la receta:
                        <textarea type="text" value={input.summary} name="summary" placeholder="Escriba el nombre de la receta" onChange={handleChange}/>
                    </label>
                </div>
                
                <div>
                    <label>Health Score de la receta (0-100):
                        <input type="number" value={input.healthScore} name="healthScore" min="0" max="100" onChange={handleChange}/>
                    </label>
                </div>
                
                <div>
                    <label>URL de la imagen de la receta:
                        <input type="text" value={input.image} name="image" placeholder="Escriba la URL de la imagen de la receta" onChange={handleChange}/>
                    </label>
                </div>
                
                <div>
                    <label>Paso a paso de la receta:
                        <textarea type="text" value={input.steps} name="steps" placeholder="Escriba el paso a paso de la receta" onChange={handleChange}/>
                    </label>
                </div>

                <div>
                    Selecciona las dietas de la receta: 
                    {diets.length && diets.map(diet=>(
                        <div 
                            onClick={(e)=>handleClick(input.diets,diet,e)}
                            key={diet.id}
                            id={diet.id}
                        >
                            {diet.name}
                        </div>
                        
                    ))}
                </div>
                <div>
                    {input.diets.length?input.diets.map(dietAdd=>(
                        <div 
                        id={`${dietAdd.id}Add`}
                        key={`${dietAdd.id}Add`}
                        >
                            {dietAdd.name}
                            <button onClick={(e)=>handleClickDos(input.diets,dietAdd,e)}>X</button>
                        </div>
                    )):"No hay dietas agregadas"}
                </div>

                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}