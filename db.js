const mongoose = require('mongoose');

// Define the connection URL
const mongoURL = "mongodb+srv://talmeezakhtar14_db_user:Talmeez%4018@cluster0.t9kqrox.mongodb.net/hotels";

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(mongoURL); 
    console.log("Connected to MongoDB Server ✅");
  } catch (error) {
    console.error("MongoDB connection error ❌", error);
    process.exit(1);
  }
}

connectDB();

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB Server');
});

module.exports = mongoose.connection;




// const mongoose = require('mongoose');

// //Define the connection URL
// const mongoURL =  "mongodb+srv://talmeezakhtar14_db_user:<Talmeez@18>@cluster0.t9kqrox.mongodb.net/hotels"

// // Set Up the MongoDB connection
// mongoose.connect(mongoURL,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// });

// //get a default connection
// //Mongodb maintains a default connection object 
// const db = mongoose.connection;

// //Define event Listeners
// db.on('connected',()=>{console.log('Connected to MongoDB Server')});
// db.on('disconnectd',()=>{console.log('Disconnected to MonogDB Server')});

// //export the database conncection
// module.exports =db;

