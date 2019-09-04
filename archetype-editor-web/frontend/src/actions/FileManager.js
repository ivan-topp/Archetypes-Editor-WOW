import React from 'react';
//import axios from 'axios',

const addFile = (indx) => {
    const newIndx = indx + 1;
    return {
        type: 'addFile',
        file: { title: 'New Tab', content: 'New Tab Pane', key: newIndx.toString() },
        newIndx
    };
};

const toggleFile = activeKey => {
    return {
        type: 'toggleFile',
        currentFile: activeKey
    };
};

const onEdit = (targetKey, action) => {
    if(action === 'remove'){
        return {
            type: 'removeFile',
            target: targetKey
        };
    } else if(action === 'add'){
        return {
            type: 'addFile',
            file: { title: 'Nuevo archivo', content: <h1>Nuevo Archivo</h1>, key: 0 }
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

export { addFile, toggleFile, onEdit, changeName };