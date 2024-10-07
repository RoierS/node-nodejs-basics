import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const srcFilePath = path.join(__dirname, "files", "wrongFilename.txt");
  const dstFilePath = path.join(__dirname, "files", "properFilename.md");

  try {
    await fs.access(srcFilePath);

    try {
      await fs.access(dstFilePath);
      throw new Error("FS operation failed");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw new Error("FS operation failed");
      }
    }

    await fs.rename(srcFilePath, dstFilePath);

    console.log(`\x1b[42m File renamed successfully! \x1b[0m`);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await rename();
