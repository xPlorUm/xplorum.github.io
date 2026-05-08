import './EditorPage.css';
import { useState } from "react";

import NavBar from './NavBar';


function DesignPage({setPage}){
    const [photos, setPhotos] = useState('');
    return (
        <div className='container'>
            <NavBar setPage={setPage}/>
            <p>Design</p>
        </div>
    )
}


export default DesignPage;