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
Make a microservice (API) that takes in the Description (raw user text input) and once the user saves the description automatically start using LLM (via API) to generate a JSON that will be semistructured in the Django DB.

Then when the user creates the actual person object, the JSON will (likely) already be made by the LLM, reducing downtime for the user.


maybe having voice to text for the description....