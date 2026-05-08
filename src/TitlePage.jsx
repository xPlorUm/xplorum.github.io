import './TitlePage.css';
import { useState } from "react";

function TitlePage({albumTitle, setAlbumTitle, setPage}){
    return (
        <div className="container">
            <h1>Photo Album Creator</h1>
            <form>
                <input type='text' placeholder='Album Title' value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)}/>
                <div className='btn-container'>
                    <button onClick={() => setPage("editor")}>Click to Start!</button>
                </div>
            </form>
        </div>
    )
}


export default TitlePage;