import { Permission } from "node-appwrite";
import { db, voteCollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
  //create collection
  await databases.createCollection(db, voteCollection, voteCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);

  console.log("Vote collection is created");

  //creating attributes and indexes

  await Promise.all([
    databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
    databases.createEnumAttribute(
      db,
      voteCollection,
      "type",
      ["Question", "answer"],
      true
    ),
    databases.createEnumAttribute(
      db,
      voteCollection,
      "voteStatus",
      ["upvoted", "downvoted"],
      true
    ),
    databases.createStringAttribute(db, voteCollection, "VoteById", 50, true),
  ]);

  console.log("vote attributes created");

  //create indexes

  //   await Promise.all([
  //     databases.createIndex(
  //       db,
  //       questionCollection,
  //       "title",
  //       IndexType.Fulltext,
  //       ["title"],
  //       ["asc"]
  //     ),
  //     databases.createIndex(
  //       db,
  //       questionCollection,
  //       "content",
  //       IndexType.Fulltext,
  //       ["content"],
  //       ["asc"]
  //     ),
  //   ]);
}
