import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import {
  PrimaryCategory,
  SecondaryCategory,
  TertiaryCategory,
} from "../models/categoryModel.js";

const __dirname = path.resolve();
const navDataPath = path.join(__dirname, "../../client/src/data/Navdata.json");
console.log(navDataPath);
const populateCategories = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://parikshitadhikari:atlas-123@cluster0.pmx1rzm.mongodb.net/fashohub?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected...");

    await PrimaryCategory.deleteMany({});
    await SecondaryCategory.deleteMany({});
    await TertiaryCategory.deleteMany({});

    const navData = JSON.parse(fs.readFileSync(navDataPath, "utf-8"));

    for (const primaryName in navData) {
      const primaryCategory = new PrimaryCategory({ name: primaryName });
      await primaryCategory.save();

      const secondaryCategories = navData[primaryName];
      for (const secondaryName in secondaryCategories) {
        const secondaryCategory = new SecondaryCategory({
          name: secondaryName,
          primaryCategoryId: primaryCategory._id,
        });
        await secondaryCategory.save();

        const tertiaryNames = secondaryCategories[secondaryName];
        for (const tertiaryName of tertiaryNames) {
          const tertiaryCategory = new TertiaryCategory({
            name: tertiaryName,
            primaryCategoryId: primaryCategory._id,
            secondaryCategoryId: secondaryCategory._id,
          });
          await tertiaryCategory.save();
        }
      }
    }

    console.log("Categories populated successfully!");
    process.exit();
  } catch (error) {
    console.error("Error populating categories:", error);
    process.exit(1);
  }
};

populateCategories();
