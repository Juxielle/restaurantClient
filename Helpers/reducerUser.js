

function reducerProfil(state, action){
    let nextState

    switch(action.type){
        case 'LOGIN_USER':
            nextState = {
                ...state,
                user: action.value
            }
            return nextState
        case 'LOGOUT_USER':
            return nextState
        case 'TAKE_USER':
            return nextState
        default:
            return nextState
    }
}

function reducerCommande(state, action){
    let nextState

    switch(action.type){
        case 'LOGIN_USER':
            return nextState
        case 'LOGOUT_USER':
            return nextState
        case 'TAKE_USER':
            return nextState
    }
}