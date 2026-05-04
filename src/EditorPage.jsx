import './EditorPage.css';
import { useState } from "react";



function ImageDropZone(){
    return(
        <>
        <h3>Add Images</h3>
        <div className="drag-container">
            <h4> Drag & Drop your Images</h4>
        </div>
        </>
    )
}

function CaptionForm(){
    return (
        <form>
            <label for='date'>Date(dd.mm.yyyy)</label>
            <input type="text" id='date' placeholder=''/>

            <label for='caption'>Caption</label>
            <input type="text" id='caption'/>
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
                <th><button className='nav-item'>Add Images</button></th>
                <th><button className='nav-item'>Layout</button></th>
                <th><button className='nav-item'>Design</button></th>
                <th><button className='nav-item'>Preview</button></th>
            </table>
        </nav>
    )
}

function PhotoQueue(){
    return (
        <div className="queue-container">
            <
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