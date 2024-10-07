const parseArgs = () => {
  const args = process.argv.slice(2);
  const res = [];

  for (let i = 0; i < args.length; i += 2) {
    const argName = args[i].replace("--", "");
    const argValue = args[i + 1];

    res.push(`${argName} is ${argValue}`);
  }

  console.log(`\x1b[42m ${res.join(", ")} \x1b[0m`);
};

parseArgs();
