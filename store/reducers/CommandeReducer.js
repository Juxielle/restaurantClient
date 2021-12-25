
const initialState = {commandes: []}

function mesCommandes (state = initialState, action){
    let nextState

    switch (action.type) {
        case 'MES_COMMANDES':
            const commandes_index = state.commandes.findIndex(item => item.produit.id == action.value.produit.id)
            if(commandes_index !== -1){
                //Le produit se trouve dans la liste, donc ce qu'on fait c'est la suppression
                nextState = {
                    ...state, //On conserve le state actuel
                    commandes: state.commandes.filter((item, index) => index === commandes_index) //On supprime
                }
            }else{
               //Le produit ne se trouve pas dans la liste, donc con l'ajoute
               nextState = {
                    ...state, //On fait une copie de notre state
                    commandes: [...state.commandes, action.value]
                }
                return nextState || state
            }
        case 'MODIFIER_QTE':
            const index2 = state.commandes.findIndex(item => item.produit.id == action.value.produit.id)
            if(index2 !== -1){
                //const coms = state.commandes.filter((item, index) => index === index2)
                state.commandes[index2].quantite = action.value.quantite;
                nextState = {
                    ...state, //On conserve le state actuel
                    //commandes: state.commandes//[...coms, action.value]
                }
                return nextState
            }
            return state
        default:
            return state
    }
}

export default mesCommandes;