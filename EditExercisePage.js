import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * EditExercisePage for user interface. Displays a form that with prepopulated fields
 * containing the data about the exercise being edits. Contains javascript code to set the
 * new edited values for each field and then to update the exercise in the data base when 
 * save is hit. Shows an alert on whether the update was succesful.
 */
export const EditExercisePage = ({exerciseToEdit}) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setdate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = JSON.stringify({
            'name': name,
            'reps': Number(reps),
            'weight': Number(weight),
            'unit': unit,
            'date': date
        })
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: editedExercise,
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(response.status === 200){
            alert('Successfully edited the exercise.');
        } else{
            alert(`Failed to edit exercise. Status code ${response.status}`);
        }
        navigate('/')
    };

    return (
        <div id="form">
            <div id="input-field">
            <h1 id="edit-header">Edit Exercise</h1>
                <div>
                    <label>Exercise Name:</label>
                    <p>
                    <input
                        type="text"
                        placeholder="Enter name here"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    </p>
                </div>
                <div>
                    <label>Number of Reps:</label>
                    <p>
                    <input
                        type="number"
                        value={reps}
                        placeholder="Enter reps here"
                        onChange={e => setReps(e.target.value)} />
                    </p>
                </div>
                <div>
                    <label>Total Weight:</label>
                    <p>
                    <input
                        type="text"
                        placeholder="Enter weight here"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} />
                    </p>
                </div>
                <div>
                    <label>Select Weight Unit:</label>
                    <p>
                    <select value={unit} onChange={e => setUnit(e.target.value)}>
                        <option value='lbs'>lbs</option>
                        <option value='kgs'>kgs</option>
                    </select>
                    </p>
                </div>
                <div>
                    <label>Enter Date:</label>
                    <p>
                    <input
                        type="text"
                        placeholder="Enter date here"
                        value={date}
                        onChange={e => setdate(e.target.value)} />
                    </p>
                </div>
                <div id="button">
                    <button
                        onClick={editExercise}
                    >Save</button>
                </div>
            </div>
        </div>
    );
}

export default EditExercisePage;