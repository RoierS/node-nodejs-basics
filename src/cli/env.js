const parseEnv = () => {
  const RSS_ENV_VARIABLES = Object.entries(process.env)
    .filter(([envVarName]) => envVarName.startsWith("RSS_"))
    .map(([envVarName, envVarValue]) => `${envVarName}=${envVarValue}`)
    .join("; ");

  console.log(`\x1b[42m RSS_ENV_VARIABLES: \x1b[0m`);
  console.log(RSS_ENV_VARIABLES);
};

parseEnv();
