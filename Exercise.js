import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md'

/**
 * Used by the ExerciseList to populate rows for the table for each exercise. 
 */
function Exercise({exercise, onDelete, onEdit}) {
    return (
        <tr id='row'>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><MdEdit onClick={() => onEdit(exercise)}/></td>
            <td><MdDeleteForever onClick={ () => onDelete(exercise._id)}/></td>
        </tr>
    );
}

export default Exercise;