import pyttsx3

engine = pyttsx3.init()
voices = engine.getProperty('voices')

# List available voices
for idx, voice in enumerate(voices):
    print(f"{idx}: {voice.name} - {voice.id}")

# Choose a male/female voice
engine.setProperty('voice', voices[96].id)  # Try index 1 or another depending on system
engine.say("D'oh!")
engine.runAndWait()