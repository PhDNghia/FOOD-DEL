import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://phdnghiadev:phdnghiadev@cluster0.uso9mc7.mongodb.net/fool-del"
    )
    .then(() => console.log("DB Connected"));
};
