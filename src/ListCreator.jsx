
import React, { useState } from 'react';

function ListCreator(){
    const [list, setList] = useState(['First']);
    const [inputValue, setInputValue] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        setList( list => [...list, inputValue]);
        setInputValue('');
    }

    function setItemHandler(e){
        setInputValue(e.target.value);
    }

    return (
        <div>
            <h2>Write A list of Items:</h2>
            <ul>
                {list.map((l, index) => (
                    <li key={index}>{l}</li>
                ))}
            </ul>
            <h2>Items that start with a "P":</h2>
            <ul>
                {list.filter((e, idx) => e.startsWith("P")).map((l, index) => (
                    <li key={index}> {l}</li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Write Here...' value={inputValue} onChange={setItemHandler}></input>
                <button>Add Item</button>
            </form>
        </div>
    )
}

export default ListCreator