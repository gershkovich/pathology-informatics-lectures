# PowerPoint Generator

This directory contains Python scripts for generating PowerPoint presentations and sound files for the pathology informatics lectures.

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Setting Up the Virtual Environment

#### For macOS/Linux:
1. Open a terminal and navigate to the `ppt_gen` directory
2. Make the setup script executable:
   ```
   chmod +x setup.sh
   ```
3. Run the setup script:
   ```
   ./setup.sh
   ```
4. This will create a virtual environment and install all required dependencies

#### For Windows:
1. Open Command Prompt and navigate to the `ppt_gen` directory
2. Run the setup script:
   ```
   setup.bat
   ```
3. This will create a virtual environment and install all required dependencies

### Activating the Environment Manually

If you need to activate the environment later:

#### For macOS/Linux:
```
source venv/bin/activate
```

#### For Windows:
```
venv\Scripts\activate.bat
```

## Installing Requirements

If you encounter issues with installing requirements, please see [INSTALL_REQUIREMENTS.md](INSTALL_REQUIREMENTS.md) for detailed instructions.

## Generating Sound Files

The `make_sounds.py` script uses Google Text-to-Speech (gTTS) to generate sound files for the interactive examples in the presentations.

### Prerequisites
- Installed requirements (including gtts)
- Active virtual environment

### Usage
1. Activate the virtual environment as described above
2. Run the script:
   ```
   python make_sounds.py
   ```
3. This will generate two sound files in the `pathology-node-presentation/assets/sounds` directory:
   - `whoosh.mp3` - Success sound
   - `doop.mp3` - Error sound
4. These sound files are used in the interactive examples in the presentations

### Customizing Sounds
You can modify the `make_sounds.py` script to change the text or add additional sounds as needed.
