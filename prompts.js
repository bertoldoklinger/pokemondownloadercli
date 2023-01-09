import fetch from "node-fetch";
import inquirer from "inquirer";

const promptForPokemon = async () => {
  return await inquirer.prompt({
    type: "input",
    name: "pokemonName",
    message: "Pokemon name:",
  });
};

const promptForDownloadInfo = async () => {
  return await inquirer.prompt({
    type: "checkbox",
    message: "Select info to download!",
    name: "options",
    choices: [
      new inquirer.Separator(" -- Options -- "),
      {
        name: "Stats",
      },
      {
        name: "Sprites",
      },
      {
        name: "Artwork",
      },
    ],
  });
};

const promptToContinue = async () => {
  return await inquirer.prompt({
    type: "confirm",
    name: "continueAnotherDownload",
    message: "Would you like to search for another pokémon?",
  });
};

const fetchPokemon = async (pokemonName) => {
  const request = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const response = await request.json();
  return response;
};

const promptUser = async () => {
  while (true) {
    const pokemonName = await promptForPokemon();
    console.log(pokemonName.pokemonName);

    const pokemonJSON = await fetchPokemon(pokemonName.pokemonName);
    console.log(pokemonJSON.name, pokemonJSON.weight);

    const pokemonOptions = await promptForDownloadInfo();
    console.log(pokemonOptions.options);

    const keepGoing = await promptToContinue();
    if (keepGoing.continueAnotherDownload === false) {
      break;
    }
  }
};
