import path from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "files", "fileToWrite.txt");
  const writeFileStream = createWriteStream(filePath);

  try {
    await pipeline(process.stdin, writeFileStream);
  } catch (error) {
    throw new Error(error);
  }
};

await write();
