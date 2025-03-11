import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

// ✅ Define the interface correctly (Export here)
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define the schema
const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (err) {
      return next(err as any);
    }
  }
  next();
});

// Method to check password validity
UserSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// ✅ Define the model
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

// ✅ Correct export (No duplicate export of `IUser`)
export default User;
