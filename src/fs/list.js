import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const dirPath = path.join(__dirname, "files");

  try {
    const files = await fs.readdir(dirPath);

    console.log(`\x1b[42m File in 'files' folder: \x1b[0m`);
    console.log(files);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await list();
