
import React, { useState } from 'react';

function StrawBerryCounter(){
    const [numberStrawberries, setNumber] = useState(0);

    function increaseNumber(){
        setNumber(prev => prev + 1);
    }

    function makeCake(){
        setNumber(prev => prev - 10);
    }

    return (
    <>
    <h2>Here is your StrawBerryCounter</h2>
    <h3>Number of Strawberries: {numberStrawberries}</h3>
    <button onClick={increaseNumber}>Press this to increase the strawberries</button>
    {numberStrawberries > 9 && <p>We have enough Strawberries for a cake</p>}
    {numberStrawberries > 9 && <button onClick={makeCake}> Make Strawberry Cake </button>}
    </>
)}

export default StrawBerryCounter