import mongoose, { Schema, model, models, Document } from "mongoose"
interface IUser extends Document {
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true,
    },
})

const Users = models.user || model<IUser>('user', userSchema)

export default Users