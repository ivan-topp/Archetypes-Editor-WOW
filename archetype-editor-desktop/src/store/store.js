import { createStore, applyMiddleware } from 'redux';

// Es aqui en el Store donde se almacena el estado de la aplicacion completa de manera centralizada
/* Esta constante define los valores predeterminados del estado que tendra la aplicacion al comienzo */

const initialState = {
    title: 'Title',
    electron: null
}

// Es aqui en el reducer donde se recibe el type de la accion a realizar y donde se realiza esta misma.

const reducer = (state, action) => {
    if(action.type === 'Change Title'){
        return {
            ...state,
            title: action.title //state.array.concat(object);
        }
    }else if (action.type === "setElectron") {
        return {
            ...state,
            electron: action.electron
        }
    }
    
    return state;
}

/*  El Middleware es una forma de interceptar las acciones dentro de la aplicacion
    (En esta funcion se puede definir alguna accion a realizar en caso de ser necesario)   */
const middleware = store => next => action => {
    console.log('ejecutando', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

export default createStore(reducer, initialState, applyMiddleware(middleware));