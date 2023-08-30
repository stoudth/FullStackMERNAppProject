//Name: Hailey Stoudt
//Onid: stoudth
//Assignment: CS 290 - Assignment 9


import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

/**
 * Defines the schema
 */
const exercisesSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true},
    date: { type: String, required: true}
});

/**
 * Compile the model from the schema.
 */
const Exercise = mongoose.model("Exercise", exercisesSchema);

/**
 * Creates a new Exercise document in the exercises collection.
 * @param {String} name - the name of the exercise
 * @param {Number} reps - the number of the weights used for the exercise
 * @param {Number} weight - the weight of the weights used for the exercise
 * @param {String} unit - the unit of measurement of the weight
 * @param {String} date  - the date the exercise was performed (specified as MM-DD-YY)
 * @returns - The object that contains the information that was created
 */
const createExercise = async (name, reps, weight, unit, date) => {
    const newExercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return newExercise.save();
}

/**
 * Finds an Exercise document based on a given filter
 * @param {Object} filter - contains Object with keys and filter values
 * @returns - Returns object that contains the information about requested documented
 */
const findExercises = async (filter) => {
    const query = Exercise.find(filter)
    return query.exec()
}

/**
 * Updates an Exercise document with a passed id based on the passed filter
 * @param {Object} id - Object with the key and id value to match document for update
 * @param {Object} updateFilter - Object containing the keys to be updated with their new values
 * @returns - Returns an object with the all the information for the newly updated exercise. if no
 * matching document is found, it returns false. 
 */
const updateExercise = async(id, updateFilter) => {
    const result = await Exercise.updateOne(id, updateFilter);
    if(result.matchedCount != 0) {
        const returnObj = await Exercise.find({'_id': id})
        return returnObj
    } else {
        return false
    }
}

/**
 * Deletes an Exercise document with a passed id in an Object. 
 * @param {Object} filter - Object with the key and id value to match document to be deleted
 * @returns - returns the deleted Count
 */
const deleteExercise = async (filter) => {
    const result = await Exercise.deleteOne(filter);
    return result.deletedCount;
}

// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export {createExercise, findExercises, updateExercise, deleteExercise};

