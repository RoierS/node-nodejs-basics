import path from "path";
import { fileURLToPath } from "url";
import { createReadStream } from "fs";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "files", "fileToRead.txt");
  const readFileStream = createReadStream(filePath);

  readFileStream.pipe(process.stdout);

  readFileStream.on("error", (error) => {
    throw new Error(error);
  });

  readFileStream.on("end", () => console.log("\n"));
};

await read();
