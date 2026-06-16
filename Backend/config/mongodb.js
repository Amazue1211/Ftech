<<<<<<< HEAD
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Database connection error:", error.message);
        // Don't exit immediately, maybe retry?
    }
};

=======
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Database connection error:", error.message);
        // Don't exit immediately, maybe retry?
    }
};

>>>>>>> aa51118b5fc82e586cfec19823be6acebdc7a04d
export default connectDB;