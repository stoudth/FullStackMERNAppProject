import React from 'react';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * HomePage for the user interface. Displays a table of all existing exercises. 
 * Contains javascript code to delete an exercise on the click of the delete icon,
 * load all the exercises from the database when the home page is loaded, and to navigate to the
 * EditExercisePage when the edit icon is clicked. 
 */
function HomePage({setExerciseToEdit}) {

    const [exercises, setExercises] = useState([]);

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204) {
            const resetExercises = exercises.filter(exercises => exercises._id !== _id);
            setExercises(resetExercises);
        }else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises', {method: 'GET'});
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    const navigate = useNavigate();

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate('/edit-exercise');
    }

    return (
        <>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
        </>
    );
}

export default HomePage;

