import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers";

const status = JSON.parse(localStorage.getItem("gameState")).gameStatus;
env.allowLocalModels = false;
const translator = await pipeline('translation', 'Xenova/m2m100_418M');

setInterval(async () => {
	if (status === "WIN" || status === "FAIL") {
		const output = await translator('մածուն', {
		  src_lang: 'hy', // Armenian
		  tgt_lang: 'en', // English
		});
		console.log(output);

		const modalElement = document.querySelectorAll("game-app")[0].shadowRoot.querySelector("game-theme-manager").querySelector("game-modal");
		const newElement = document.createElement("div");
		newElement.textContent = output;
		modalElement.appendChild(newElement);

	}

}, 1000);

