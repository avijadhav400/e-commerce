import { model, Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    }
});

const User = model('User', userSchema);

export default User;