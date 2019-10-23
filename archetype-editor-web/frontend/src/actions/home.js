//import axios from 'axios',
import { feedBackMessage } from './others';

const changeTitle = newTitle => {
    return {
        type: 'Change Title',
        title: newTitle
    };
};

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
            {id:"Lista6",lista:[],type:"Atributtion"}
    
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
            {id:"Lista6",lista:[],type:"Atributtion"}
    
        ]};
    }

    return {
        type: "addFile", 
        file
    };
}

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

const handlerDownload = (dispatch, file, files) => {
    if (file !== null && files.length > 0){
        try {
            const fileTarget = files.filter(ofile => ofile.key === file)[0];
            const filename = fileTarget.title.substr(0, fileTarget.title.lastIndexOf('.'));
            const element = document.createElement("a");
            const blob = new Blob([JSON.stringify(fileTarget.content)], {type: 'text/plain'});
            element.href = URL.createObjectURL(blob);
            if(filename !== ''){
                element.download = filename + ".json";
            }else{
                element.download = fileTarget.title + ".json";
            }
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            dispatch(saveFile(fileTarget));
            feedBackMessage({ type: "success", msg: "El archivo " + fileTarget.title + " se ha descargado correctamente."});
        } catch (error) {
            feedBackMessage({ type: "error", msg: "El archivo " + file.title + " no se pudo descargar."});
            console.log(error);
        }
        
    }
}

export { changeTitle, toggleOpenFileDialog, saveFile, handlerDownload, openDbArchetype };
