import path from "path";
import { fileURLToPath } from "url";
import { createWriteStream, createReadStream } from "fs";
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const archiveFilePath = path.join(__dirname, "files", "archive.gz");
  const fileToArchivePath = path.join(__dirname, "files", "fileToCompress.txt");

  const gzip = createGzip();
  const srcStream = createReadStream(fileToArchivePath);
  const dstStream = createWriteStream(archiveFilePath);

  try {
    await pipeline(srcStream, gzip, dstStream);
    console.log(`\x1b[42m File compressed! \x1b[0m`);
  } catch (error) {
    throw new Error(error);
  }
};

await compress();
