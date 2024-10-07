import { pipeline } from "stream/promises";
import { Transform } from "stream";

const transform = async () => {
  const readableStream = process.stdin;
  const writableStream = process.stdout;

  const transformStream = new Transform({
    transform(chunk, _, cb) {
      const reversedChunk = chunk
        .toString()
        .trim()
        .split("")
        .reverse()
        .join("");

      cb(null, `${reversedChunk} \n`);
    },
  });

  try {
    pipeline(readableStream, transformStream, writableStream);
  } catch (error) {
    throw new Error(error);
  }
};

await transform();
