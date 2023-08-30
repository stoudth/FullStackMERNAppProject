import React from 'react';
import Exercise from './Exercise';

/**
 * Creates a table that is displayed in the Homepage. Utilizes the Exercise component
 * to create the rows of the table. 
 */
function ExerciseList({exercises, onDelete, onEdit}) {
    return (
        <div id="table">
            <table id="exercises">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Units</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <Exercise exercise={exercise} 
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
            </table>
        </div>
    );
}

export default ExerciseList;
