@echo off
echo Using Python version:
python --version

echo Creating Python virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Upgrading pip, setuptools, and wheel...
python -m pip install --upgrade pip setuptools wheel

echo Installing dependencies from requirements.txt...
pip install -r requirements.txt || echo Warning: Some packages may not have installed correctly.

echo Creating sample script...
echo #!/usr/bin/env python3 > generate_ppt.py
echo. >> generate_ppt.py
echo print("PowerPoint Generator Test") >> generate_ppt.py
echo print("========================") >> generate_ppt.py
echo. >> generate_ppt.py
echo try: >> generate_ppt.py
echo     from pptx import Presentation >> generate_ppt.py
echo     print("✅ Successfully imported python-pptx") >> generate_ppt.py
echo. >> generate_ppt.py
echo     # Create a simple presentation as a test >> generate_ppt.py
echo     prs = Presentation() >> generate_ppt.py
echo     title_slide_layout = prs.slide_layouts[0] >> generate_ppt.py
echo     slide = prs.slides.add_slide(title_slide_layout) >> generate_ppt.py
echo     title = slide.shapes.title >> generate_ppt.py
echo     subtitle = slide.placeholders[1] >> generate_ppt.py
echo     title.text = "Hello, World!" >> generate_ppt.py
echo     subtitle.text = "python-pptx is working correctly!" >> generate_ppt.py
echo     prs.save("test.pptx") >> generate_ppt.py
echo     print("✅ Created test.pptx successfully") >> generate_ppt.py
echo except ImportError as e: >> generate_ppt.py
echo     print("❌ Failed to import python-pptx:", e) >> generate_ppt.py
echo     print("Please try: pip install python-pptx") >> generate_ppt.py
echo except Exception as e: >> generate_ppt.py
echo     print("❌ Error:", e) >> generate_ppt.py
echo. >> generate_ppt.py
echo try: >> generate_ppt.py
echo     from PIL import Image >> generate_ppt.py
echo     print("✅ Successfully imported PIL (Pillow)") >> generate_ppt.py
echo except ImportError as e: >> generate_ppt.py
echo     print("❌ Failed to import PIL:", e) >> generate_ppt.py
echo. >> generate_ppt.py
echo try: >> generate_ppt.py
echo     import pandas as pd >> generate_ppt.py
echo     print("✅ Successfully imported pandas (optional)") >> generate_ppt.py
echo except ImportError as e: >> generate_ppt.py
echo     print("❌ Failed to import pandas (optional):", e) >> generate_ppt.py
echo. >> generate_ppt.py
echo try: >> generate_ppt.py
echo     import numpy as np >> generate_ppt.py
echo     print("✅ Successfully imported numpy (optional)") >> generate_ppt.py
echo except ImportError as e: >> generate_ppt.py
echo     print("❌ Failed to import numpy (optional):", e) >> generate_ppt.py
echo. >> generate_ppt.py
echo print("\nSetup test complete!") >> generate_ppt.py
echo print("If python-pptx is working, you should see a test.pptx file in this directory.") >> generate_ppt.py

echo Setup completed!
echo To activate the virtual environment in the future, run: venv\Scripts\activate.bat
echo To test your setup, run: python generate_ppt.py
pause
