# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)


## Setup
```bash
# move to the tauri directory
cd solodex/frontend-tauri

# install dependencies
npm install

# run development server
npm run tauri dev
```


## TODO
Path 1: Using `ollama` with a model that is capable of being run on your phone (i.e. choose a smaller model) and have the `Save` button on the Description pop up ping the Llama model auotmatically parse the text data that the user inputs and transforms it into semi structured data (JSON) as a Description object ASAP. Then, back at the original (+) page, when that `Submit` button it clicked, the Description object is (hopefully) already made and can be pushed to the DB.


Path 2: Using `transformers` or `ollama` with larger models, when the `Save` button is clicked, we ping an API in the backend which has a process running (that is capable of running larger models (i.e. memory constraints)) to do the same things as above.  model auotmatically parse the text data that the user inputs and transforms it into semi structured data (JSON) as a Description object ASAP. Then, back at the original (+) page, when that `Submit` button it clicked, the Description object is (hopefully) already made and can be pushed to the DB.



maybe having voice to text for the description....