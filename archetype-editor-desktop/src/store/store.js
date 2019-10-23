import { createStore, applyMiddleware } from 'redux';

// Es aqui en el Store donde se almacena el estado de la aplicacion completa de manera centralizada
/* Esta constante define los valores predeterminados del estado que tendra la aplicacion al comienzo */
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `Bloque ${k}`,
    content: `Bloque ${k}`,
    
  }));
const initialState = {
    title: 'Title',
    newTabIndex: 0,
    files: [
        { title: 'Nuevo archivo', content: 'Content of Tab Pane 1', path:'', saved: false, key: '0' ,
        allList: [
            {id:"Lista10",lista:[],type:"State"},
            {id:"Lista20",lista:[],type:"Protocol"},
            {id:"Lista30",lista:[],type:"Data"},
            {id:"Lista40",lista:[],type:"Events"},
            {id:"Lista50",lista:[],type:"Description"},
            {id:"Lista60",lista:[],type:"Atributtion"}
    
        ]},
    ],
    currentFile: '0',
    dialogOpenFile: false,
    
    sampleList: {id:"Lista0",lista:[
        {id:'Bloque 0',
         content:'Bloque 0',
         type: 'State'  
        },
        {id:'Bloque 1',
         content:'Bloque 1',
         type: 'Protocol'  
        },
        {id:'Bloque 2',
         content:'Bloque 2',
         type: 'Data'  
        },
        {id:'Bloque 3',
         content:'Bloque 3',
         type: 'Events'  
        },
        {id:'Bloque 4',
         content:'Bloque 4',
         type: 'Description'  
        },
        {id:'Bloque 5',
         content:'Bloque 5',
         type: 'Atributtion'  
        }

    ],type:"Sample"},
    electron: null
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
        file.allList.forEach((list)=>{
            list.id=list.id + file.key;
          });
        file.saved = false;
        file.path = '';
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
    } else if(action.type==='updateblocklist'){
        let {files} = state;
        let file = files.filter(file=>file.key===state.currentFile)[0];
        const aux = files.filter(file=>file.key===state.currentFile)[0].allList.filter(list => list.id === action.blocklist.id)[0];
        files[files.indexOf(file)].allList[file.allList.indexOf(aux)]=action.blocklist;
        
       
        return{
            ...state,
            files
        }
        /*if(action.list==='Lista1'){
            return {
                ...state,
                items1: action.blocklist
            }
        }else if(action.list==='Lista2'){
            return {
                ...state,
                items2: action.blocklist
            }
        }*/
        
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