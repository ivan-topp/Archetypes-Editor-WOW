//import axios from 'axios',
import { feedBackMessage } from './others';

const changeTitle = newTitle => {
    return {
        type: 'Change Title',
        title: newTitle
    };
};

const toggleOpenFileDialog = modalState => {
    return {
        type: 'toggleOpenFileDialog',
        state: modalState
    };
};

const saveFile = (file) => {
    return {
        type: 'saved',
        file
    }
}

const openDbArchetype = (archetype) => {
    let file = {};
    if(archetype.translations){
        file = { title: archetype.archetype_id.value, content: {
            adl_version: archetype.adl_version,
            archetype_id: archetype.archetype_id,
            concept: archetype.concept,
            definition: archetype.definition,
            description: archetype.description,
            is_controlled: archetype.is_controlled,
            ontology: archetype.ontology,
            original_language: archetype.original_language,
            translations: archetype.translations,
            uid: archetype.uid
        }, saved: false, key: '0', _id: archetype._id ,
        allList: [
            {id:"Lista1",lista:[],type:"State"},
            {id:"Lista2",lista:[],type:"Protocol"},
            {id:"Lista3",lista:[],type:"Data"},
            {id:"Lista4",lista:[],type:"Events"},
            {id:"Lista5",lista:[],type:"Description"},
            {id:"Lista6",lista:[],type:"Atributtion"},
            {id:"Lista7",lista:[],type:"Items"}
    
        ]};
    } else {
        file = { title: archetype.archetype_id.value, content: {
            adl_version: archetype.adl_version,
            archetype_id: archetype.archetype_id,
            concept: archetype.concept,
            definition: archetype.definition,
            description: archetype.description,
            is_controlled: archetype.is_controlled,
            ontology: archetype.ontology,
            original_language: archetype.original_language,
            uid: archetype.uid
        }, saved: false, key: '0', _id: archetype._id ,
        allList: [
            {id:"Lista1",lista:[],type:"State"},
            {id:"Lista2",lista:[],type:"Protocol"},
            {id:"Lista3",lista:[],type:"Data"},
            {id:"Lista4",lista:[],type:"Events"},
            {id:"Lista5",lista:[],type:"Description"},
            {id:"Lista6",lista:[],type:"Atributtion"},
            {id:"Lista7",lista:[],type:"Items"}
        ]};
    }

    return {
        type: "addFile", 
        file
    };
}

const handlerDownload = (ipcRenderer, file, files, closeTab=null) => {
    if (file !== null && files.length > 0){
        try {
            const fileTarget = files.filter(ofile => ofile.key === file)[0];
            let filename = fileTarget.title.substr(0, fileTarget.title.lastIndexOf('.'));
            if (filename !== '') {
                   filename = filename + ".json"; 
            }else{
                filename = fileTarget.title;
            }
            if(fileTarget.path === ''){
                ipcRenderer.send('fs:saveas', filename, fileTarget.content, file, closeTab, fileTarget);
            } else {
                console.log("existe");
                ipcRenderer.send('fs:save', fileTarget.path, fileTarget.content, closeTab, fileTarget);
            }
        } catch (error) {
            if (closeTab === null) {
                feedBackMessage({ type: "error", msg: "El archivo " + file.title + " no se pudo guardar."});
                console.log(error);
            }
        }
        
    }
}

const handlerSaveAs = (ipcRenderer, file, files, closeTab=null) => {
    if (file !== null && files.length > 0){
        try {
            const fileTarget = files.filter(ofile => ofile.key === file)[0];
            ipcRenderer.send('fs:saveas', fileTarget.title, fileTarget.content, file, closeTab, fileTarget);

        } catch (error) {
            if (closeTab === null) {
                feedBackMessage({ type: "error", msg: "El archivo " + file.title + " no se pudo guardar."});
                console.log(error);
            }
        }
        
    }
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

export { changeTitle, toggleOpenFileDialog, saveFile, handlerDownload, handlerSaveAs, openDbArchetype };