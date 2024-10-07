import { fileURLToPath } from "url";
import path from "path";
import { Worker } from "worker_threads";
import { cpus } from "os";

const performCalculations = async () => {
  const workers = [];
  const res = [];
  const numCPUs = cpus().length;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const workerPath = path.join(__dirname, "worker.js");

  const promises = Array(numCPUs)
    .fill(0)
    .map((_, i) => {
      return new Promise((resolve, reject) => {
        const workerOption = {
          workerData: 10 + i,
        };

        const worker = new Worker(workerPath, workerOption);

        worker.on("message", (result) => {
          res[i] = { status: "resolved", data: result };
          resolve();
        });

        worker.on("error", () => {
          res[i] = { status: "error", data: null };
          reject();
        });

        workers.push(worker);
      });
    });

  await Promise.all(promises);

  console.log(`\x1b[42m Array of results: \x1b[0m`, res);
};

await performCalculations();
