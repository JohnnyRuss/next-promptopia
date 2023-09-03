import mongoose from "mongoose";

let isConnected = false;

const DB_APP_CONNECTION = process.env.DB_APP_CONNECTION.replace(
  "<password>",
  process.env.DB_PASSWORD
);

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("DB is already Connected ✔");
    return;
  }

  try {
    await mongoose.connect(DB_APP_CONNECTION);

    isConnected = true;

    console.log("DB is Connected ✔");
  } catch (error) {
    console.log(error);
  }
};
