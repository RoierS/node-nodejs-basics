import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { createReadStream } from "fs";

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "files", "fileToCalculateHashFor.txt");

  const hash = crypto.createHash("sha256");
  const fileStream = createReadStream(filePath);

  fileStream.on("data", (chunk) => hash.update(chunk));

  fileStream.on("end", () =>
    console.log(`\x1b[42m Hash:\x1b[0m`, hash.digest("hex")),
  );

  fileStream.on("error", (error) => {
    throw new Error(error);
  });
};

await calculateHash();
