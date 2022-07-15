import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {getDetails} from "../../redux/actions";

export default function DetailRecipe({match}){
    let id = match.params.id;
    const dispatch = useDispatch();
    const detailRecipe = useSelector(state=>state.detailRecipe);
    useEffect(()=>{
        dispatch(getDetails(id))
    },[])
    if(detailRecipe){
        if(detailRecipe.name){
            return <div>{detailRecipe.id}</div>
        }
        else{
            return (
                <div>
                    La receta con id {id} no existe
                </div>)
        }
    }
}