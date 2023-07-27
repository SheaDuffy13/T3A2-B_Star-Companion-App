const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const planetRoutes = require('./routes/planetRoutes');
const starSystemRoutes = require('./routes/starSystemRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const port = process.env.PORT || 3001;
const app = express();

let corsOptions = {
    origin: ['http://localhost:3001'],
    optionsSuccessStatus: 200
}

// Connect to MongoDB
mongoose.connect(
    process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then(() => console.log('Connected to database', mongoose.connection.name))
.catch(error => {
    console.log('Error connecting to MongoDB');
    console.log(error);
});

// Middleware
app.use(helmet());
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.get("/", (request, response) => {
	response.json({
		message:"Welcome to the note taking backend"
	});
});

// app.use('/api/auth', authRoutes);
// app.use('/api/planets', planetRoutes);
// app.use('/api/starSystems', starSystemRoutes);
// app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
