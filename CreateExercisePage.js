import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * CreateExercisePage for the user interface. Contains a form that can
 * be filled out with fields for the new exercises data. Contains javascript code
 * to set each value for each field as they are being filled out and to add the new
 * exercise to the database. Will show an alert detailing if the POST request was 
 * successful. 
 */
export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const createExercise = async () => {
        const newExercise = JSON.stringify({
            'name': name, 
            'reps': Number(reps), 
            'weight': Number(weight), 
            'unit': unit,
            'date': date
        });
        const response = await fetch('/exercises', {
            method: 'POST',
            body: newExercise,
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(response.status === 201){
            alert('Successfully added the exercise.');
        } else{
            alert(`Failed to add exercise. Status code ${response.status}.`);
        }
        navigate('/')
    };

    return (
        <div id="form">
            <div id='input-field'>
            <h1 id='create-header'>Create Exercise</h1>
            <div>
                <label class="label">Exercise Name:</label>
                 <p>
                    <input
                        type="text"
                        placeholder="Enter name here"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </p>
            </div>
            <div>
                <label class="label">Number of Reps:</label>
                <p>
                <input
                    type="number"
                    value={reps}
                    placeholder="Enter reps here"
                    onChange={e => setReps(e.target.value)} />
                </p>
            </div>
            <div>
                <label class="label">Total Weight:</label>
                <p>
                <input
                    type="number"
                    placeholder="Enter weight here"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
                </p>
            </div>
            <div>
                <label class='label' id="label-select">Select Weight Unit:</label>
                <p>
                <select onChange={e => setUnit(e.target.value)}>
                    <option value='lbs'>lbs</option>
                    <option value='kgs'>kgs</option>
                </select>
                </p>
            </div>
            <div>
                <label class="label">Enter Date:</label>
                <p>
                <input
                    type="text"
                    placeholder="Enter date here (mm-dd-yy)"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                </p>
            </div >
            <div id="button">
                <button
                    onClick={createExercise}
                >Save</button>
            </div>
            </div>
        </div>
    );
}

export default CreateExercisePage;