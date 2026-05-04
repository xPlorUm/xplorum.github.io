import './EditorPage.css';
import { useState } from "react";


function dropHandler(ev) {
  ev.preventDefault();
  const files = [...ev.dataTransfer.items]
    .map((item) => item.getAsFile())
    .filter((file) => file);
//   displayImages(files);
}

function ImageDropZone(){
    const dropZone = document.getElementById("drop-zone");
    dropZone.addEventListener("drop", dropHandler);
    dropZone.addEventListener("drop", (e) => {
        if ([...e.dataTransfer.items].some((item) => item.kind === "file"))
        {
            e.preventDefault();
        }
    });
 
    dropZone.addEventListener("dragover", (e) => {
        // const fileItems = [...e.dataTransfer.items]
    });

    return(
        <>
        <h3>Add Images</h3>
        <label id='drop-zone'> Drag & Drop your Images
            <input type='file' id='file-input' multiple accept="image/*"/>
        </label>
        </>
    )
}

function CaptionForm(){
    return (
        <form>
            <label for='date'>Date(dd.mm.yyyy)</label>
            <input type="text" id='date' placeholder=''/>
            <div className='caption-container'>
                <label for='caption'>Caption</label>
                <input type="text" id='caption'/>
            </div>
        </form>
    )
}

function PhotoEntryPanel(){
    return(
        <main>
            <h2>Photo Album Creator</h2>
            <ImageDropZone/>
            <CaptionForm/>
        </main>
    )
}

function NavBar(){
    return (
        <nav className='nav-container'>
            <table>
                <tr>
                    <th><button className='nav-item'>Add Images</button></th>
                    <th><button className='nav-item'>Layout</button></th>
                    <th><button className='nav-item'>Design</button></th>
                    <th><button className='nav-item'>Preview</button></th>
                </tr>
            </table>
        </nav>
    )
}

function PhotoQueue(){
    return (
        <div className="queue-container">
            <p>Empty yet</p>
        </div>
    )
}


function EditorPage(){
    return (
        <div className='editor-container'>
            <NavBar/>
            <PhotoEntryPanel/>
            <PhotoQueue/>
        </div>
    )
}


export default EditorPage;