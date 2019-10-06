import { createStore, applyMiddleware, bindActionCreators } from 'redux';

// Es aqui en el Store donde se almacena el estado de la aplicacion completa de manera centralizada
/* Esta constante define los valores predeterminados del estado que tendra la aplicacion al comienzo */

const initialState = {
    title: 'Title',
    newTabIndex: 0,
    DBArchetypes: [],
    files: [
        { title: 'Nuevo archivo', content: {
            adl_version: " ",
            archetype_id: {value: "Nuevo archivo"},
            concept: " ",
            definition: {
                attributes: [],
                node_id: " ",
                occurrences: {
                    lower: " ",
                    lower_included: " ",
                    lower_unbounded: " ",
                    upper: " ",
                    upper_included: " ",
                    upper_unbounded: " "
                },
                rm_type_name: " "
            },
            description: {
                details: {
                    copyright: " ",
                    keywords: " ",
                    language: {
                        code_string: " ",
                        terminology_id: {
                            value: " "
                        }
                    },
                    misuse: " ",
                    purpose: " ",
                    use: " "
                },
                lifecycle_state: " ",
                original_author: [],
                other_contribuitors: [],
                other_details: []
            },
            is_controlled: " ",
            ontology: {
                term_definitions: {
                    items: []
                }
            },
            original_language: {
                code_string: " ",
                terminology_id: {
                    value: " "
                }
            },
            uid: {
                value: " "
            }
        }, saved: false, key: '0', _id: '' },
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
        //validar que no hayan arquetipos abiertos con el mismo nombre 
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
        files[action.indx].saved = false;
        const filename = action.newName.substr(0, action.newName.lastIndexOf('.'));
        const ext = action.newName.substr(action.newName.lastIndexOf('.')+1);
        if(filename !== ''){
            if(ext !== '' && (ext === 'json' || ext === 'xml' || ext === 'adl')){
                files[action.indx].content.archetype_id.value = filename;
            }else{
                files[action.indx].content.archetype_id.value = action.newName;
            }
        }else{
            if(ext !== ''){
                files[action.indx].content.archetype_id.value = ext;
            }
        }
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
    } else if (action.type === 'updateDBArchetypesVariable') {
        return {
            ...state,
            DBArchetypes: action.DBArchetypes
        }
    } else if (action.type === 'updateFile') {
        const { files } = state;
        const fileTarget = files.filter(ofile => ofile.key === action.file.key)[0];
        files[files.indexOf(fileTarget)] = action.file;
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