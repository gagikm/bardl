import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers";

env.allowLocalModels = false;
const translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');

let keepGoing = true;
const status = JSON.parse(localStorage.getItem("gameState")).gameStatus;

while (keepGoing) {
	if (status === "WIN" || status === "FAIL") {
		const solution = JSON.parse(localStorage.getItem("gameState")).solution;
		const output = await translator(solution, {
		  src_lang: 'hye_Armn', // Hindi
		  tgt_lang: 'eng_Latn', // French
		});
		console.log(output);

		const modalElement = document.querySelectorAll("game-app")[0].shadowRoot.querySelector("game-theme-manager").querySelector("game-modal");
		const newElement = document.createElement("div");
		newElement.textContent = output[0].translation_text;
		modalElement.appendChild(newElement);
		keepGoing = false;
	}
}
