import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
})

const USers = model('user', userSchema)