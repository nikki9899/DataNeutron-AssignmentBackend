const express = require("express");
const todo = require("../models/todo");
const Count = require("../models/count");
 
const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        // Extracting the data from the request body
        const { newData } = req.body;

        // If no data is provided, return a 400 Bad Request response
        if (!newData) {
            return res.status(400).json({ error: "No data provided" });
        }

        // Creating a new entry in the database
        const result = await todo.create({
            title: newData.title 
        });

        // Increment the Add count using the Count model
        await Count.findOneAndUpdate({}, { $inc: { addCount: 1 } }, { new: true, upsert: true });

        

        // Sending a success response with the newly created data
        return res.status(201).json({ message: "Data added successfully", newData: result });
    } catch (error) {
        // Handling errors and sending an error response
        console.error("Error adding data:", error);
        return res.status(500).json({ error: "An error occurred while adding data" });
    }
});

router.get("/all", async (req, res) => {
    try {
        // Fetch all data from the todo model
        const allData = await todo.find();
        return res.status(200).json(allData);
    } catch (error) {
        console.error("Error fetching all data:", error);
        return res.status(500).json({ error: "An error occurred while fetching all data" });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { updatedData } = req.body;

        // If no data is provided, return a 400 Bad Request response
        if (!updatedData) {
            return res.status(400).json({ error: "No data provided" });
        }

        // Find the existing entry in the database by ID
        const existingEntry = await todo.findById(id);

        if (!existingEntry) {
            return res.status(404).json({ error: "Todo not found" });
        }

        // Update the existing entry with the new data
        existingEntry.title = updatedData.title;
        await existingEntry.save();

        // Increment the Update count using the Count model
        await Count.findOneAndUpdate({}, { $inc: { updateCount: 1 } }, { new: true, upsert: true });

        

        // Sending a success response with the updated data
        return res.status(200).json({ message: "Data updated successfully", updatedData: existingEntry });
    } catch (error) {
        // Handling errors and sending an error response
        console.error("Error updating data:", error);
        return res.status(500).json({ error: "An error occurred while updating data" });
    }
});

router.get("/count", async (req, res) => {
    try {
        // Fetch the counts from the database using the Count model
        const count = await Count.findOne();
        if (!count) {
            return res.status(404).json({ error: "Count document not found" });
        }
        return res.status(200).json(count);
    } catch (error) {
        console.error("Error fetching count:", error);
        return res.status(500).json({ error: "An error occurred while fetching count" });
    }
});

module.exports = router;
