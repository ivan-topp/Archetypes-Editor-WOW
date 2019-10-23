import React from 'react';
//import axios from 'axios',

const toggleFile = activeKey => {
    return {
        type: 'toggleFile',
        currentFile: activeKey
    };
};

const onEdit = (action) => {
    if(action === 'add'){
        return {
            type: 'addFile',
            file: { title: 'Nuevo archivo', content: <h1>Nuevo Archivo</h1>, key: 0 ,
            allList: [
                {id:"Lista1",lista:[],type:"State"},
                {id:"Lista2",lista:[],type:"Protocol"},
                {id:"Lista3",lista:[],type:"Data"},
                {id:"Lista4",lista:[],type:"Events"},
                {id:"Lista5",lista:[],type:"Description"},
                {id:"Lista6",lista:[],type:"Atributtion"}
        
            ]}
        };
    }
    
};

const changeName = (newName, key, indx) => {
    return {
        type: 'changeFilename',
        key,
        indx,
        newName
    };
};

const removeFile = key => {
    return {
        type: 'removeFile',
        target: key
    };
}

/*const getCollection = () => {
    return dispatch => {
        return axios.get('http://localhost:4000/collection')
            .then(response => {
                dispatch({
                    type: 'protocol-type',
                    data: response.data
                });
            });
    }
}*/
const updateblocklist = (blocklist) =>{
    return {
        type: 'updateblocklist', 
        blocklist
    }
}
export { toggleFile, onEdit, changeName, removeFile, updateblocklist };