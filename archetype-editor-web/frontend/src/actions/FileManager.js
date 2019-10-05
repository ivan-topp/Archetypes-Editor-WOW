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
            file: { title: 'Nuevo archivo', content: {
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
            }, saved: false, key: '0', _id: '' }
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