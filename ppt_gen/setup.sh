#!/bin/bash

# Print Python version
echo "Using Python version:"
python3 --version

# Create and activate a virtual environment
echo "Creating Python virtual environment..."
python3 -m venv venv

# Activate the virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip and setuptools
echo "Upgrading pip and setuptools..."
pip install --upgrade pip setuptools wheel

# Use requirements.txt for installation
echo "Installing dependencies..."
pip install -r requirements.txt || echo "Warning: Some packages may not have installed correctly."

# Create a simple test script
echo "Creating sample script..."
cat > generate_ppt.py << 'EOL'
#!/usr/bin/env python3

print("PowerPoint Generator Test")
print("========================")

try:
    from pptx import Presentation
    print("✅ Successfully imported python-pptx")
    
    # Create a simple presentation as a test
    prs = Presentation()
    title_slide_layout = prs.slide_layouts[0]
    slide = prs.slides.add_slide(title_slide_layout)
    title = slide.shapes.title
    subtitle = slide.placeholders[1]
    title.text = "Hello, World!"
    subtitle.text = "python-pptx is working correctly!"
    prs.save("test.pptx")
    print("✅ Created test.pptx successfully")
except ImportError as e:
    print("❌ Failed to import python-pptx:", e)
    print("Please try: pip install python-pptx")
except Exception as e:
    print("❌ Error:", e)

try:
    from PIL import Image
    print("✅ Successfully imported PIL (Pillow)")
except ImportError as e:
    print("❌ Failed to import PIL:", e)

try:
    import pandas as pd
    print("✅ Successfully imported pandas (optional)")
except ImportError as e:
    print("❌ Failed to import pandas (optional):", e)

try:
    import numpy as np
    print("✅ Successfully imported numpy (optional)")
except ImportError as e:
    print("❌ Failed to import numpy (optional):", e)

print("\nSetup test complete!")
print("If python-pptx is working, you should see a test.pptx file in this directory.")
EOL

chmod +x generate_ppt.py

echo "Setup completed!"
echo "To activate the virtual environment in the future, run: source venv/bin/activate"
echo "To test your setup, run: python generate_ppt.py"
