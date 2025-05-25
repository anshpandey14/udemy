// _id string pk
//   username string
//   email string
//   fullName string
//   avatar string
//   coverImage string
//   watchHistory ObjectId videos
//   password string
//   refreshToken string
//   createdAt Date
//   updateAt Date

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    // id will automatically be added by mongoDB

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary URL / AWS
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video", // this is reffered from videoSchema and is taken the name like in this case "User" not userSchema
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true, //separate object, this will create createdAt and updatedAT
  }
);

export const User = mongoose.model("User", userSchema);
