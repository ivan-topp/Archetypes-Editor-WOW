import React from 'react';

export const AdministradorDeArchivos = {
    "title": "Administrador de archivos",
    "content": (
        <div>
            <h2>La Clase FileManager</h2>
            <p>Código...</p>
            <p>La función "map" itera el arreglo de archivos global definido en el store.js para generar una pestaña por cada archivo en uso.</p>
            <p>La función "mapStateToProps" es la que como dice su nombre, mapea el estado del store.js como propiedad de la clase "FileManager" (ver documentación de redux y react-redux para más información).</p>
            <p>La función "mapDispatchToProps" es la que como dice su nombre, mapea el despacho (dispatch) de acciones (actions) que son cargadas desde "actions/[component].js" (Es esta la que despacha la acción con el objeto con el respectivo "type" y "datos" necesarios, enviando este objeto al reducer ubicado en "store.js" que ejecuta una acción para actualizar el estado global de la aplicación dependiendo del type de la acción) como propiedad de la clase "FileManager" (ver documentación de redux y react-redux para más información).</p>
        </div>
        )
}