//import axios from 'axios',

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

export { changeTitle, toggleOpenFileDialog };