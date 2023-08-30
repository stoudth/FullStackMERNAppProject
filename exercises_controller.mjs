//Name: Hailey Stoudt
//Onid: stoudth
//Assignment: CS 290 - Assignment 9

import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Creates a filter object based on information passed in the request body.
 * @returns Object - dictionary object with necessary filter information
 */
const createFilter = (req) => {
    const filter = {}
    if (req.body.name != undefined) {
        filter.name = req.body.name;
    } if (req.body.reps != undefined) {
        filter.reps = req.body.reps;
    } if (req.body.weight != undefined) {
        filter.weight = req.body.weight;
    } if (req.body.unit != undefined) {
        filter.unit = req.body.unit
    } if (req.body.date != undefined) {
        filter.date = req.body.date
    } return filter
};

/**----------CITATION---------------**
 * The function isDateValid() is not my own.
 * SOURCE:https://canvas.oregonstate.edu/courses/1914625/assignments/9202231?module_item_id=23098235
* Function taken from Assignment 9 Page and allowed for use in this assignment.
* Function is used by validateRequest to validate passed date in in the request.
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}
/*----------END CITATION----------------*/


/**
 * Takes a request as a paramter and returns a string identifying if all parts of the 
 * request are valid. Calls the isDateValid() function to validate the date. 
 * @param {*} req 
 * @returns - A string either stating 'valid' or 'invalid'
 */
const validateRequest = (req) => {
    const numberOfKeys = Object.keys(req).length
    if(numberOfKeys !== 5) {
        return 'invalid'
    } if(typeof req.name !== 'string'){
        return 'invalid'
    } if(req.name === '') {
        return 'invalid'
    } if(typeof req.reps !== 'number' || req.reps <= 0) {
        return 'invalid'
    } if(typeof req.weight !== 'number' || req.weight <= 0) {
        return 'invalid'
    } if(req.unit !== 'kgs' && req.unit !== 'lbs') {
        return 'invalid'
    } if(isDateValid(req.date) !== true) {
        return 'invalid'
    }return 'valid'
}

/**
 * Creates a new Exercise object with information that is passed in the request body.
 * If successful, sends back 201 status with JSON object containing newly created document info. If 
 * request is invalid, returns a 400 status. Calls the validateRequest function to validate the 
 * request sent. 
 */
app.post('/exercises', async (req, res) => {
    const validate = validateRequest(req.body)
    if(validate === 'valid') {
        const exercise = await exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        res.status(201).json(exercise);
    } else {
        res.status(400).json({Error: 'Invalid request'})
}});

/**
 * Gets all documents in the exercises collection. If successful, sends a
 * 200 status and a list containing JSON objects of all the documents' information.
 */
app.get('/exercises', (req, res) =>{
    exercises.findExercises()
        .then(exercises => {
            res.status(200).json(exercises)
        })
})

/**
 * Gets a single document based on the id passed in the request parameters. If successful, 
 * returns a 200 status with a Json object with that document's information. If id does not 
 * exist, sends back a 404 status. 
 */
app.get('/exercises/:_id', async (req, res) => {
    const exerciseList = await exercises.findExercises({_id: req.params._id})
    if(exerciseList.length !== 0){
        res.status(200).json(exerciseList)
    } else {
        res.status(404).json({Error: 'Not found'})
    }})


/**
 * Updates a document in the exercises collection that has the id that matches the
 * one passed in the request parameters. Validates request using the validateRequest function.
 * If an exercise is updated, it sends back a 200 status with the updatedExercise. If no id 
 * is found, then sends back a 404 status. If the request sent is invalid, it sends back a 400 status. 
 */
app.put('/exercises/:_id', async (req, res) => {
    const validate = validateRequest(req.body)
    if(validate === 'valid') {
        const update = createFilter(req)
        const updatedExercise = await exercises.updateExercise({_id: req.params._id}, update)
        if(updatedExercise !== false) {
            res.status(200).json(updatedExercise)
        } else {
            res.status(404).json({Error: 'Not found'})
        }
    } else {
        res.status(400).json({Error: 'Invalid request'})
    }
});

/**
 * Deletes a document in the exercises collection that matches the id passed in the request parameters. 
 * If successful, it sends a 204 status with no content. If the id is not found, a 404 status is sent back. 
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteExercise({_id: req.params._id})
        .then(deletedExercise => {
            if(deletedExercise != 0) {
                res.status(204).send()
            } else{
                res.status(404).json({Error: 'Not found'})
            }
        })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});