
import React, {useState} from 'react';


function Entry({name, age, job}){
    return (
        <li> Name: {name}, Age: {age}, Job: {job}</li>
    )
}

function EntryMaskViewer() {
    const [entries, setEntries] = useState([])
    const [personEntry, setPerson] = useState({})
    const [personName, setName] = useState('')
    const [personAge, setAge] = useState(0)
    const [personJob, setJob] = useState('')

    function addEntry(e){
        e.preventDefault();
        setPerson(<Entry name={personName} age={personAge} job={personJob}/>)
        console.log(personEntry);
        // setEntries(list => [...list, personEntry])
        setName('');
        setAge(0);
        setJob('');
    }

    function addName(e){
        setName(e.target.value);
    }
    function addAge(e){
        setName(e.target.value);
    }
    function addJob(e){
        setName(e.target.value);
    }

    return (
        <>
        <h2>Here is your Entry Mask Viewer! </h2>
        <ul>
            {/* <Entry name="Max" age={13} job="Pupil"/>
            <Entry name="Sara" age={23} job="Student"/>
            <Entry name="Anders" age={45} job="Cook"/> */}
        </ul>

        <h2>Enter a new member!</h2>
        <form onSubmit={addEntry}>
            <input type="text" placeholder='Name' value={personName} onChange={addName}/>
            <input type="text" placeholder='Age' value={personAge} onChange={addAge}/>
            <input type="text" placeholder='Job' value={personJob} onChange={addJob}/>
            <button>Add Person</button>
        </form>
        </>
    )
}

export default EntryMaskViewer