import { useState } from "react";


function NavBar({setPage}){
    return (
        <nav className='nav-container'>
            <table>
                <tbody>
                    <tr>
                        <th><button className='nav-item' onClick={() => setPage("editor")}>Add Images</button></th>
                        <th><button className='nav-item' onClick={() => setPage("layout")}>Layout</button></th>
                        <th><button className='nav-item' onClick={() => setPage("design")}>Design</button></th>
                        <th><button className='nav-item' onClick={() => setPage("preview")}>Preview</button></th>
                    </tr>
                </tbody>
            </table>
        </nav>
    )
}


export default NavBar;