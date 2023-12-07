const mongoose =require('mongoose')
const mongoURI="mongodb://localhost:27017/inotebook"

// const connectToMongoose=async()=>{
//     await mongoose.connect(mongoURI);
//         console.log("connected to mongoose succesfuly")
//  
// }
const connectToMongoose = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

// Call the function to connect



module.exports = connectToMongoose