//   _id string pk
//   video ObjectId videos
//   owner ObjectId users
//   content string
//   createdAt Date
//   updateAt Date

import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    video: {
      type: Schema.Type.ObjectId,
      ref: "Video",
    },
    Owner: {
      type: Schema.Type.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model("Comment", commentSchema);
