from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA
import getpass

app = Flask(__name__)
CORS(app)

load_dotenv()

########### 이미지 생성 ###############
API_URL = "https://ai.api.nvidia.com/v1/genai/stabilityai/sdxl-turbo"
SDXL_TURBO = os.getenv("SDXL_TURBO")

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json
    text_prompt = data.get('text_prompt')
    fixed_prompt = "like an anime profile"
 
    full_prompt = f"{text_prompt} {fixed_prompt}"
    
    headers = {
        "Authorization": f"Bearer {SDXL_TURBO}",
        "Accept": "application/json",
    }
    
    payload = {
        "text_prompts": [
            {
                "text": full_prompt,
                "weight": 1
            }
        ],
        "seed": 0,
        "sampler": "K_EULER_ANCESTRAL",
        "steps": 2
    }
    
    response = requests.post(API_URL, headers=headers, json=payload)
    response.raise_for_status()
    response_body = response.json()
    
    return jsonify(response_body)
########### 이미지 생성 ###############

########### 캐릭터 LLM 시스템 프롬프트 ###############

# 환경 변수에서 NVIDIA_API_KEY 읽기
NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")

if not NVIDIA_API_KEY or not NVIDIA_API_KEY.startswith("nvapi-"):
    nvapi_key = getpass.getpass("Enter your NVIDIA API key: ")
    assert nvapi_key.startswith("nvapi-"), f"{nvapi_key[:5]}... is not a valid key"
    os.environ["NVIDIA_API_KEY"] = nvapi_key
    NVIDIA_API_KEY = nvapi_key

character_prompt = {"name": "", "introduction": "", "scenario": ""}

@app.route('/set-character-prompt', methods=['POST'])
def set_character_prompt():
    global character_prompt
    data = request.json
    character_prompt["name"] = data.get('name', character_prompt["name"])
    character_prompt["introduction"] = data.get('introduction', character_prompt["introduction"])
    character_prompt["scenario"] = data.get('scenario', character_prompt["scenario"])
    
    return jsonify({"message": "Character prompt set successfully", "character_prompt": character_prompt})

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')

    try:
        user_message_obj = HumanMessagePromptTemplate.from_template(user_message)
    except ValueError as e:
        app.logger.error(f"Error creating user message: {e}")
        return jsonify({'message': 'Error creating user message'}), 500
    
    system_message = (
        f"Character Name: {character_prompt['name']}\n"
        f"Introduction: {character_prompt['introduction']}\n"
        f"Scenario: {character_prompt['scenario']}\n"
        f"You are the model that holds this information. The information you enter is about you. You must interact with the user by acting on the input values ​​and acting according to the scenario."
    )

    try:
        system_message_obj = SystemMessagePromptTemplate.from_template(system_message)
    except ValueError as e:
        app.logger.error(f"Error creating system message: {e}")
        return jsonify({'message': 'Error creating system message'}), 500

    prompt = ChatPromptTemplate.from_messages([
        system_message_obj,
        user_message_obj
    ])
    
    chain = prompt | ChatNVIDIA(model="meta/llama3-70b-instruct") | StrOutputParser()

    response_text = ""
    for txt in chain.stream({"input": user_message}):
        response_text += txt
    
    return jsonify({"response": response_text})

########### 캐릭터 LLM 시스템 프롬프트 ###############

if __name__ == '__main__':
    app.run(debug=True)