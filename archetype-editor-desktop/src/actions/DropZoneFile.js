const openFile = (files, newTabIndex) => {
    return {
        type: 'openFile',
        files,
        newTabIndex
    };
};

export { openFile };