import mongoose from "mongoose";

// Connect to MongoDB
function connect() {
    mongoose.connect(process.env.MONGODB_URI).then((res) => {
        console.log("Connected to MongoDB.....");
    }).catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });
}

export default connect;