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
    const file = { title: archetype.archetype_id.value, content: {
        adl_version: archetype.adl_version,
        archetype_id: archetype.archetype_id,
        concept: archetype.concept,
        definition: archetype.definition,
        description: archetype.description,
        is_controlled: archetype.is_controlled,
        ontology: archetype.ontology,
        original_language: archetype.original_language,
        uid: archetype.uid
    }, saved: false, key: '0', _id: archetype._id, path:'' };
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