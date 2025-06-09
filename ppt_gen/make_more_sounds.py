import os
import subprocess
import time

# Create the sounds directory if it doesn't exist
sounds_dir = "../pathology-node-presentation/assets/sounds"
os.makedirs(sounds_dir, exist_ok=True)

print("Creating sound files...")

# Function to create sound files using a simple approach that works on macOS
def create_sound(text, output_mp3, voice="Alex"):
    # macOS requires AIFF format for the say command
    aiff_file = output_mp3.replace(".mp3", ".aiff")
    
    print(f"Creating {output_mp3}...")
    try:
        # Create AIFF file using macOS text-to-speech with specified voice
        # Common male voices: Alex, Daniel, Fred, Lee, Tom
        subprocess.run(["say", "-v", voice, "-o", aiff_file, text], check=True)
        print(f"Generated AIFF file: {aiff_file} using voice: {voice}")
        
        # For proper file naming
        final_mp3 = output_mp3
        
        # If we want MP3, try to convert
        if output_mp3.endswith(".mp3"):
            try:
                # Try to use ffmpeg if available
                subprocess.run(["ffmpeg", "-y", "-i", aiff_file, "-acodec", "libmp3lame", "-ab", "128k", output_mp3], 
                             check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                print(f"Converted to MP3: {output_mp3}")
                os.remove(aiff_file)  # Clean up AIFF file
            except (subprocess.SubprocessError, FileNotFoundError):
                print(f"Could not convert to MP3. Using AIFF file instead.")
                final_mp3 = aiff_file
                print("Note: If you need MP3 files, install ffmpeg via 'brew install ffmpeg'")
        
        return True, final_mp3
    except Exception as e:
        print(f"Error creating sound: {e}")
        return False, None

# Whoosh sound for success
whoosh_path = os.path.join(sounds_dir, "whoosh.mp3")
success, final_path = create_sound("goot", whoosh_path, voice="Milena") # Milena has a deeper female voice
if success:
    print(f"Created success sound: {final_path}")
    
# Doop sound for error
doop_path = os.path.join(sounds_dir, "doop.mp3")
success, final_path = create_sound("Error!", doop_path, voice="Grandpa") # Grandpa has a more expressive voice
if success:
    print(f"Created error sound: {final_path}")

print("\nSound files have been created successfully!")
print("These can be used in the presentation's interactive example.")
print("To use them, update the sounds.js file to load these MP3 files instead of using base64 encoded audio.")