const express = require('express');
// const bodyParser = require('body-parser');
const createTables = require('./db/setup');
const pool = require('./db/index');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(bodyParser.json()); 
// app.use('/api', userRoutes);

app.use(express.json())
app.use('/api', userRoutes)

async function initializeApp() {
    try {
        await createTables(pool)
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
          });

    } catch (error) {
        console.error("Error initialize app:", error.message)
    }
}

initializeApp();