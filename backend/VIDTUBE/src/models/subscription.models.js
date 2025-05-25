//   _id string pk
//   subscriber ObjectId users
//   channel ObjectId users
//   createdAt Date
//   updatedAt Date

import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Type.ObjectId, // one who is SUBSCRIBING
      ref: "User",
    },
    channel: {
      type: Schema.Type.ObjectId, // one to whom `subscriber` is SBSCRIBING
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
