# Chara Chat

# Don't be lonely, Talk whenever you want💅🏻 !

---

> Nvidia Generative AI Developer Contest | With Langchain 🤖

---

# Tech Stack 🧑‍💻

| Dependency | Version |
| ---------- | ------- |
| Python     | 3.8     |
| node       | 20.11.1 |
| npm        | 10.2.3  |

---

## GenAI Model(Nvidia nim)🤖

- stabilityai/sdxl-turbo
- meta/llama3-70b-instruct

---

## Orchestration Framework✨

- Langchain

---

## Client(Frontend)🌐

- React
- Javascript

---

# Project settings (How to use)

## Folder tree 🌳

- Client
  - This is the React code folder.
- GenModel
  - This is a Python file created using GenModels.
  - To use GenModel(text2img.py) create the API Key of `NVIDIA_API_KEY` and
    `SDXL_TURBO` after creating `.env` in the root folder.

```
📦 character-llm-Chara-Chat
 ┣ 📂 client
 ┣ ┣ 📂 src
 ┣ ┗ ┗ 📂 components
 ┣ ┗ ┗ 📂 pages
 ┣ ┗ ┗ 📂 shared
 ┣ 📂 GenModel
 ┗ ┗ 📝 text2img.py
```

---

## Client

> To use React, npm and node must be installed at the latest version ✨

---

1. Go to the path `character-llm-Chara-Chat/client`
2. Type `npm install` in that path
3. Run the React by typing `npm start`, and the project will run on port 3000.

---

## GenModel

> Requires Nvidia Nim's API. Create `.env` in the project root path and enter
> the API Key there.

---

1. `Go to the path character-llm-Chara-Chat/GenModel`
2. Type `python text2img.py`
3. Run 😎

---

# DEMO

[![](https://img.youtube.com/vi/5TMIsrUg-rc/0.jpg)](https://www.youtube.com/watch?v=5TMIsrUg-rc)
