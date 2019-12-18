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
                    other_contributors: [],
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
                translations: [],
                uid: {
                    value: " "
                }
            }, saved: false, key: '0', _id: '' ,
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
const udateAllBlockList = (blocklist) =>{
    return {
        type: 'udateAllBlockList', 
        blocklist
    }
}
export { toggleFile, onEdit, changeName, removeFile, updateblocklist, udateAllBlockList };