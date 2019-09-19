import React from 'react';

export const InfraestructuraWeb = {
    "title": "Infraestructura Aplicación Web",
    "content": (
        <div>
            +---+ archetype-editor-web<br/>
                |---+ backend<br/>
                    |---+ models<br/>
                        |---+ collection.js<br/>
                    |---+ public<br/>
                            |---+ bundle.css<br/>
                            |---+ bundle.js<br/>
                            |---+ bundle.html<br/>
                    |---+ routes<br/>
                        |---+ collection.js<br/>
                    |---+ db.js<br/>
                    |---+ index.js<br/>
                |---+ frontend<br/>
                    |---+ src<br/>
                        |---+ actions<br/>
                            |---+ DropZoneFile.js<br/>
                            |---+ FileManager.js<br/>
                            |---+ home.js<br/>
                        |---+ components<br/>
                            |---+ App.js<br/>
                            |---+ DropZoneFile.css<br/>
                            |---+ DropZoneFile.js<br/>
                            |---+ FileManager.css<br/>
                            |---+ FileManager.js<br/>
                            |---+ Home.js<br/>
                        |---+ store<br/>
                            |---+ store.js<br/>
                        |---+ index.js<br/>
                        |---+ serviceWorker.js<br/>
                    |---+ index.html<br/>
                |---+ .babelrc<br/>
                |---+ .gitignore<br/>
                |---+ package.json<br/>
                |---+ package-lock.json<br/>
                |---+ webpack.config.json<br/>

            <h2>El directorio "backend"</h2>
            <p>En este directorio se encuentran todos los archivos relacionados con el servidor.</p>
            <h1>El directorio "models"</h1>
            <p>En este directorio se encuentran todos los archivos relacionados con los modelos de datos, es en cada archivo de este directorio donde se define el schema correspondiente al dato de la DB MongoDB.</p>
            <h1>El directorio "public"</h1>
            <p>En este directorio se encuentran todos los archivos públicos del servidor, en este caso aquí se almacena el código compilado a html, css, y js puro.</p>
            <h1>El directorio "routes"</h1>
            <p>En este directorio se encuentran todos los archivos relacionados con las rutas para el manejo de peticiones desde la aplicación web/desktop para la interacción con la DB.</p>
            <h1>El archivo "db.js"</h1>
            <p>En este archivo se encuentra la conexión a la base de datos MongoDB, mediante mongoose.</p>
            <h1>El archivo "index.js"</h1>
            <p>En este archivo se encuentra el código principal que se ejecutará en el servidor, es aquí donde se define el comportamiento lógico del servidor, aquí se inicializa el servidor express y se le asignan los paámetros correspondientes (rutas, etc).</p>
            <h2>El directorio "fontend"</h2>
            <p>En este directorio se encuentran todos los archivos relacionados con la aplicación cliente.</p>
            <h1>El directorio "src"</h1>
            <p>En este directorio se encuentran los componentes, el store, y las actions correspondientes para el uso de react-redux.</p>
            <h1>El archivo "index.html"</h1>
            <p>En este archivo se encuentra el código html principal en donde se monta la aplicación react.</p>   
        </div>
        )
}