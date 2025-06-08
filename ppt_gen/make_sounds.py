from gtts import gTTS
import os

# Create the sounds directory if it doesn't exist
sounds_dir = "../pathology-node-presentation/assets/sounds"
os.makedirs(sounds_dir, exist_ok=True)

# Whoosh sound for success
whoosh = gTTS("sh", lang='en')
whoosh_path = os.path.join(sounds_dir, "whoosh.mp3")
whoosh.save(whoosh_path)
print(f"Created success sound: {whoosh_path}")

# Doop sound for error
doop = gTTS("D'oh!", lang='en')
doop_path = os.path.join(sounds_dir, "doop.mp3")
doop.save(doop_path)
print(f"Created error sound: {doop_path}")

print("\nSound files have been created successfully!")
print("These can be used in the presentation's interactive example.")
print("To use them, update the sounds.js file to load these MP3 files instead of using base64 encoded audio.")
