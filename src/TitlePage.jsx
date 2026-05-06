import './TitlePage.css';
import { useState } from "react";

function TitlePage(){
    return (
        <div className="container">
            <h1>Photo Album Creator</h1>
            <form>
                <input type='text' placeholder='Album Title'/>
                <div className='btn-container'>
                    <button>Click to Start!</button>
                </div>
            </form>
        </div>
    )
}


export default TitlePage;