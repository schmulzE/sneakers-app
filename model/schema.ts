import { Schema, model, models } from "mongoose";

interface User {
  email: string;
  password: string
}

const userSchema = new Schema<User>({
  email: String,
  password: String
})

const Users = models.user || model('user', userSchema)

export default Users