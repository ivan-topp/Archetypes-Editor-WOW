import React from 'react';
//import axios from 'axios',

const toggleFile = activeKey => {
    return {
        type: 'toggleFile',
        currentFile: activeKey
    };
};

const onEdit = (targetKey, action) => {
    if(action === 'add'){
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

export { toggleFile, onEdit, changeName, removeFile };