import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB Connected Successfully!");
            
        })

        connection.on('error', (err) => {
            console.log("MongoDB Connection Error. Please make sure mongodb is running. " + err);
            process.exit();
        })
    } catch (error) {
        console.log("Something Went Wrong!")
        console.log("Error in DB_Connection : ", error);
        
    }
}