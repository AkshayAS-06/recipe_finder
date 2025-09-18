# from fastapi import APIRouter, UploadFile, File
# from backend.app.agents.speech_agent import extract_ingredients_from_audio
# import mimetypes, os


# router = APIRouter()

# @router.post("/ingredients-from-speech")
# async def ingredients_from_speech(file: UploadFile = File(...)):
#     # Save temp file
#     contents = await file.read()
#     temp_path = f"/tmp/{file.filename}"
#     with open(temp_path, "wb") as f:
#         f.write(contents)

#     # 🔍 Debugging: check file type and size
#     print("File type:", mimetypes.guess_type(temp_path))
#     print("File size:", os.path.getsize(temp_path), "bytes")

#     # Pass to speech agent
#     ingredients = extract_ingredients_from_audio(temp_path)
#     print("Ingredients from speech route:", ingredients)
#     return {"ingredients": ingredients}

from fastapi import APIRouter, UploadFile, File
from backend.app.agents.speech_agent import extract_ingredients_from_audio
from pydub import AudioSegment
import mimetypes, os

router = APIRouter()

def ensure_pcm_wav(input_path: str, output_path: str):
    """Convert any audio file to PCM WAV"""
    audio = AudioSegment.from_file(input_path)
    audio.export(output_path, format="wav", codec="pcm_s16le")

@router.post("/ingredients-from-speech")
async def ingredients_from_speech(file: UploadFile = File(...)):
    # Save uploaded file
    contents = await file.read()
    temp_input = f"/tmp/{file.filename}"
    temp_wav = f"/tmp/converted.wav"

    with open(temp_input, "wb") as f:
        f.write(contents)

    # Debug info
    print("File type:", mimetypes.guess_type(temp_input))
    print("File size:", os.path.getsize(temp_input), "bytes")

    # ✅ Always convert to PCM WAV
    ensure_pcm_wav(temp_input, temp_wav)

    # Pass PCM WAV to speech agent
    ingredients = extract_ingredients_from_audio(temp_wav)
    print("Ingredients from speech route:", ingredients)
    return {"ingredients": ingredients}
