import fetch from "node-fetch";
import inquirer from "inquirer";
//import { parseOptions } from "./saving.js";

const fetchPokemon = async (pokemonName) => {
  const request = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const response = await request.json();
  console.log(response);
  return response;
};

const promptForPokemon = async () => {
  const pokemonNamePrompt = [
    {
      type: "input",
      name: "pokemonName",
      message: "Pokemon name:",
    },
  ];

  inquirer.prompt(pokemonNamePrompt).then((answers) => {
    let pokemonName = answers.pokemonName;
    fetchPokemon(pokemonName);
    console.log(pokemonName);
  });
};

const promptForDownloadInfo = async () => {
  inquirer
    .prompt([
      {
        type: "checkbox",
        message: "Select info to download!",
        name: "downloadInfos",
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
        validate(answer) {
          if (answer.length < 1) {
            return "You must choose at least one info to download.";
          }

          return true;
        },
      },
    ])
    .then((answers) => {
      console.log(answers.downloadInfos);
    });
};
