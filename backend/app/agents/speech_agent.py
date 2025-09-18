# import speech_recognition as sr
# import re

# def extract_ingredients_from_audio(audio_file_path: str) -> list[str]:
#     recognizer = sr.Recognizer()
#     recognizer.energy_threshold = 300
#     recognizer.pause_threshold = 1.0
#     recognizer.dynamic_energy_threshold = True

#     try:
#         # Load audio file instead of listening to microphone
#         with sr.AudioFile(audio_file_path) as source:
#             audio = recognizer.record(source)
#     except Exception:
#         # Could not load or process the audio file
#         return []

#     try:
#         # Use Google Web Speech API
#         text = recognizer.recognize_google(audio, language="en-US")
#         # Split by comma or space, return clean ingredient list
#         ingredients_list = [item.strip() for item in re.split(r"[,]+", text) if item.strip()]
#         print("Ingredients List",ingredients_list)
#         return ingredients_list
#     except sr.UnknownValueError:
#         # Speech was unintelligible
#         return []
#     except sr.RequestError:
#         # Could not request results from Google Speech Recognition service
#         return []

import speech_recognition as sr

def extract_ingredients_from_audio(audio_file_path: str) -> list[str]:
    recognizer = sr.Recognizer()
    try:
        print(f"Loading audio file: {audio_file_path}")
        with sr.AudioFile(audio_file_path) as source:
            audio = recognizer.record(source)
        print("Audio loaded, starting recognition...")
        text = recognizer.recognize_google(audio, language="en-US")
        print(f"Transcribed text: {text}")
        ingredients_list = [i.strip() for i in text.split(",") if i.strip()]
        print(f"Parsed ingredients: {ingredients_list}")
        return ingredients_list
    except sr.UnknownValueError:
        print("Speech could not be understood.")
    except sr.RequestError as e:
        print(f"API request failed: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    return []
