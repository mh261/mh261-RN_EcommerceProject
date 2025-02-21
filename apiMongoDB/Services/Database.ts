import mongoose from "mongoose"
import { MONGO_URL } from "../config"

export default async() =>   {
    try{
        await mongoose.connect(MONGO_URL);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}