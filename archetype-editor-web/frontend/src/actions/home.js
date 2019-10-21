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

const handlerDownload = (dispatch, file, files) => {
    if (file !== null && files.length > 0){
        try {
            const fileTarget = files.filter(ofile => ofile.key === file)[0];
            const element = document.createElement("a");
            const blob = new Blob([fileTarget.content], {type: 'text/plain'});
            element.href = URL.createObjectURL(blob);
            element.download = fileTarget.title;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            dispatch(saveFile(fileTarget));
            feedBackMessage({ type: "success", msg: "El archivo " + fileTarget.title + " se ha descargado correctamente."});
        } catch (error) {
            feedBackMessage({ type: "error", msg: "El archivo " + file.title + " no se pudo cargar."});
            console.log(error);
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

export { changeTitle, toggleOpenFileDialog, saveFile, handlerDownload };