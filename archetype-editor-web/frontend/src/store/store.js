import { createStore, applyMiddleware } from 'redux';

// Es aqui en el Store donde se almacena el estado de la aplicacion completa de manera centralizada
/* Esta constante define los valores predeterminados del estado que tendra la aplicacion al comienzo */

const initialState = {
    title: 'Title',
    newTabIndex: 0,
    files: [
        { title: 'Nuevo archivo', content: 'Content of Tab Pane 1', saved: false, key: '0' },
    ],
    currentFile: '0',
    dialogOpenFile: false
}

// Es aqui en el reducer donde se recibe el type de la accion a realizar y donde se realiza esta misma.

const reducer = (state, action) => {
    if(action.type === 'Change Title'){
        return {
            ...state,
            title: action.title //state.array.concat(object);
        }
    } else if (action.type === 'toggleFile') {
        return{
            ...state, 
            currentFile: action.currentFile
        }
    } else if (action.type === 'addFile') {
        const { newTabIndex } = state;
        const file = action.file;
        file.key = (newTabIndex + 1).toString();
        file.saved = false;
        return{
            ...state, 
            files: state.files.concat(file),
            currentFile: file.key,
            newTabIndex: newTabIndex + 1
        }
    } else if (action.type === 'removeFile') {
        let { currentFile } = state;
        let lastIndex;
        state.files.forEach((file, indx) => {
            if(file.key === action.target) {
                lastIndex = indx - 1;
            }
        });
        const files = state.files.filter(file => file.key !== action.target);
        if (files.length) {
            if (lastIndex >= 0){
                currentFile = files[lastIndex].key;
            } else {
                currentFile = files[0].key;
            }
        } else {
            currentFile = null;
        }
        return {
            ...state,
            files, 
            currentFile
        }
    } else if (action.type === 'toggleOpenFileDialog') {
        return {
            ...state,
            dialogOpenFile: action.state
        }
    } else if (action.type === 'changeFilename') {
        const { files } = state;
        files[action.indx].title = action.newName;
        return {
            ...state,
            files
        }
    } else if (action.type === 'openFile'){
        return {
            ...state,
            files: action.files,
            newTabIndex: action.newTabIndex,
            currentFile: action.newTabIndex.toString()
        }
    } else if (action.type === 'saved') {
        const { files } = state;
        files[files.indexOf(action.file)].saved = true;
        return {
            ...state,
            files
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