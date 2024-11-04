import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers";

env.allowLocalModels = false;
const translator = await pipeline('translation', 'Xenova/m2m100_418M');
const output = await translator('մածուն', {
  src_lang: 'hy', // Armenian
  tgt_lang: 'en', // English
});
console.log(output);