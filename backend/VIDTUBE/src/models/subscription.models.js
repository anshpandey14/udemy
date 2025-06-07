//   _id string pk
//   subscriber ObjectId users
//   channel ObjectId users
//   createdAt Date
//   updatedAt Date

import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // one who is SUBSCRIBING
      ref: "User",
      required: true,
    },
    channel: {
      type: Schema.Types.ObjectId, // one to whom `subscriber` is SBSCRIBING
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.index({ subscriber: 1, channel: 1 }, { unique: true });

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
