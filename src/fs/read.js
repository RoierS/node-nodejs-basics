import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "files", "fileToRead.txt");

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");

    console.log(`\x1b[42m File content:\x1b[0m`, fileContent);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw error;
  }
};

await read();
