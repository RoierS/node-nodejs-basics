import path from "path";
import { fileURLToPath } from "url";
import { createWriteStream, createReadStream } from "fs";
import { pipeline } from "stream/promises";
import { createGzip, createUnzip } from "zlib";

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const archiveFilePath = path.join(__dirname, "files", "archive.gz");
  const fileToArchivePath = path.join(__dirname, "files", "fileToCompress.txt");

  const gzip = createUnzip();
  const srcStream = createReadStream(archiveFilePath);
  const dstStream = createWriteStream(fileToArchivePath);

  try {
    await pipeline(srcStream, gzip, dstStream);
    console.log(`\x1b[42m File decompressed! \x1b[0m`);
  } catch (error) {
    throw new Error(error);
  }
};

await decompress();
