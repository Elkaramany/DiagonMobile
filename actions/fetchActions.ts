import axios from 'axios';
import { Alert } from 'react-native';

export const fetchAll = () => {
    return (dispatch) => {
        getAllShirtColors(dispatch);
        getAllDesigns(dispatch);
    }
}

export const setSelectedShirt=(item)=>{
    return(dispatch)=>{
        dispatch({type: 'assign_shirt', payload: item})
    }
}

export const setSelectedDesign=(item)=>{
    return(dispatch)=>{
        dispatch({type: 'assign_design', payload: item})
    }
}

const getAllShirtColors = (dispatch) => {
    axios.get(`https://diagondesignsapi.herokuapp.com/Colors/fetch_all_colors`).then((item) => {
        dispatch({ type: 'assign_shirt_colors', payload: item.data })
    })
}

const getAllDesigns = (dispatch) => {
    axios.get(`https://diagondesignsapi.herokuapp.com/Colors/fetch_all_designs`).then((item) => {
        dispatch({ type: 'assign_all_designs', payload: item.data })
    })
}
