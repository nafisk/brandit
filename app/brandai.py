import os
from typing import List
import openai
import argparse
import re

MAX_INPUT_LENGTH = 32

def main():
    print('Running brandai.py')

    # reads the command line argument
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', '-i', type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    # generate the branding snippet
    print(f'User_input: {user_input}')
    if validate_length(user_input):
        result = generate_branding_snippet(user_input)
        keywords_result = generate_keywords(user_input)
    else:
        raise ValueError(f"Input length too long. Must be less than {MAX_INPUT_LENGTH} characters.")

def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH


# returns generated branding snippet
def generate_keywords(prompt: str) -> List[str]:
    
    # initialize the openai api
    openai.api_key = os.getenv("OPENAI_API_KEY")
    enriched_prompt = f"Generate related branding key words for {prompt}: "
    print(f"Enriched Prompt  -> {enriched_prompt}")

    # generate the snippet
    response = openai.Completion.create(model="davinci-instruct-beta-v3", prompt=enriched_prompt, max_tokens=32)
    
    # extract the snippet
    keywords_text = response.choices[0]["text"]

    # strip whitespace, split by comma, and remove empty strings
    keywords_text = keywords_text.strip()
    keywords_array = re.split(",|\n|;|-", keywords_text)
    keywords_array = [k.lower().strip() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k) > 0]

    print(f"Keywords         -> {keywords_array}\n")

    return keywords_array


# returns generated branding snippet
def generate_branding_snippet(prompt: str) -> str:
    
    # initialize the openai api
    openai.api_key = os.getenv("OPENAI_API_KEY")
    enriched_prompt = f"Generate upbeat branding snippet for {prompt}: "
    print(f"Enriched Prompt  -> {enriched_prompt}")

    # generate the snippet
    response = openai.Completion.create(model="davinci-instruct-beta-v3", prompt=enriched_prompt, max_tokens=32)
    
    # extract the snippet
    branding_text = response.choices[0]["text"]

    # strip whitespace
    branding_text = branding_text.strip()

    # Add ... to the end of the snippet
    last_char = branding_text[-1]
    if last_char not in {'.', '!', '?'}:
        branding_text += '...'

    print(f"Branding Snippet -> {branding_text}\n")

    return branding_text

if __name__ == "__main__":
    main()