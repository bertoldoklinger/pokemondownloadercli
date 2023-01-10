import fs from "fs/promises";
import path from "path";
import { fetchPokemon } from "./prompts.js";
import fetch from "node-fetch";

const saveImageFile = async (filePath, arrayBuffer) => {
  await fs.writeFile(filePath, Buffer.from(arrayBuffer));
};

const createFolder = async (folderName) => {
  const folderPath = path.join(process.cwd(), folderName);
  try {
    await fs.access(folderPath);
  } catch {
    fs.mkdir(folderPath);
  }
};

const pokemonObject = await fetchPokemon("mewtwo");

const savePokemonStats = async (folderName, pokemonStatsObject) => {
  let statsString = "";
  for (const stat of pokemonStatsObject) {
    statsString += `${stat.stat.name} : ${stat.base_stat}\n`;
  }

  await createFolder(folderName);

  const filePath = path.join(process.cwd(), folderName, "stats.txt");
  await fs.writeFile(filePath, statsString);
};

const savePokemonArtwork = async (folderName, pokemonSpritesObject) => {
  const url = pokemonSpritesObject.other["official-artwork"].front_default;
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  await fs.writeFile("artwork.png", Buffer.from(arrayBuffer));
  const filePath = path.join(process.cwd(), folderName, "artwork.png");
  await saveImageFile(filePath, arrayBuffer);
};

savePokemonArtwork("mewtwo", pokemonObject.sprites);
