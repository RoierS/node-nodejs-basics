import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "files", "fileToRemove.txt");

  try {
    await fs.unlink(filePath);

    console.log(`\x1b[42m File deleted successfully! \x1b[0m`);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw error;
  }
};

await remove();
