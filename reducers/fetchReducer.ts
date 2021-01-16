interface Props{
    allShirtColors: Array<{id: number, name: string, image: string, hexCode: string}>,
    allDesigns: Array<string>,
    selectedShirt: string,
    selectedDesign: string,
}

const INITIAL_STATE : Props={
    allShirtColors: [],
    allDesigns: [],
    selectedShirt: '',
    selectedDesign: '',
}

export default(state={INITIAL_STATE}, action)=>{
    if(action.type === "assign_shirt_colors"){
        return {...state, allShirtColors: action.payload}
    }else if(action.type === "assign_all_designs"){
        return {...state, allDesigns: action.payload}
    }else if (action.type === "sign_me_out_success") {
        return { ...state, ...INITIAL_STATE }
    }else if (action.type === "assign_shirt") {
        return { ...state, selectedShirt: action.payload }
    }else if (action.type === "assign_design") {
        return { ...state, selectedDesign: action.payload }
    }
    return state;
}