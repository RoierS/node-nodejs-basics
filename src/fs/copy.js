import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const srcFilePath = path.join(__dirname, "files");
  const dstFilePath = path.join(__dirname, "files_copy");

  try {
    await fs.cp(srcFilePath, dstFilePath, {
      recursive: true,
      errorOnExist: true,
      force: false,
    });

    console.log(
      `\x1b[42m Folder "files" with all its content copied into folder "files_copy" \x1b[0m`,
    );
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await copy();
