import './EditorPage.css';
import { useState } from "react";

import NavBar from './NavBar';


function LayoutPage({setPage}){
    const [photos, setPhotos] = useState('');
    return (
        <div className='container'>
            <NavBar setPage={setPage}/>

        </div>
    )
}


export default LayoutPage;