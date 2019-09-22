import React from 'react';

export const InfraestructuraDesktop = {
    "title": "Infraestructura Aplicación Desktop",
    "content": (
        <div>
            +---+ archetype-editor-desktop<br/>
                |---+ public<br/>
                    |---+ electron.js<br/>
                    |---+ index.html<br/>
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
                |---+ .gitignore<br/>
                |---+ package.json<br/>
                |---+ package-lock.json<br/>
            
            <h2>El directorio "public"</h2>
            <p>En este directorio se encuentra el archivo index.html que se monta en la aplicación electron si es que se está en modo producción y el archivo "electron.js", que es el clásico "main.js" de electron, es decir, el código que define la aplicación electron.</p>
            <h1>El directorio "src"</h1>
            <p>En este directorio se encuentran los componentes, el store, y las actions correspondientes para el uso de react-redux.</p>
            <h1>El archivo "index.html"</h1>
            <p>En este archivo se encuentra el código html principal en donde se monta la aplicación react.</p>
        </div>
        )
}