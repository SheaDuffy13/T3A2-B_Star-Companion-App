const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const planetRoutes = require('./routes/planetRoutes');
const starSystemRoutes = require('./routes/starSystemRoutes');

require('dotenv').config();

const port = process.env.PORT || 3001;
const app = express();

app.set('trust proxy', 1);
app.use(cookieParser());

let corsOptions = {
    origin: ['http://localhost:3000', 'https://star-companion.netlify.app'],
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

app.use(cors(corsOptions))
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended: true}));

// Routes
app.get("/", (request, response) => {
	response.json({
		message:"Welcome to the backend",
	});
});

app.get("/databaseHealth", async (request, response) => {
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;
    response.json({
        readyState: databaseState,
        dbName: databaseName,
        dbModels: databaseModels,
        dbHost: databaseHost
    })
});

app.use('/api/user', userRoutes);
app.use('/api/planet', planetRoutes);
app.use('/api/starSystem', starSystemRoutes);

// Error handling middleware
app.use(function(err, req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
console.error(err.stack);
// handle the error here
res.status(500).send('Something broke!');
});
  



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
