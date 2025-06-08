# Configuring Python Interpreter in Your IDE

This guide will help you configure the Python interpreter in various IDEs to use the virtual environment we've created.

## Visual Studio Code

1. Open your project folder in VS Code
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open the Command Palette
3. Type "Python: Select Interpreter" and select it
4. Choose the interpreter from your virtual environment:
   - For macOS/Linux: Look for `./venv/bin/python`
   - For Windows: Look for `.\venv\Scripts\python.exe`
5. If you don't see your virtual environment, click "Enter interpreter path..." and navigate to it manually

## PyCharm

1. Go to **File > Settings** (Windows/Linux) or **PyCharm > Preferences** (Mac)
2. Navigate to **Project: ppt_gen > Python Interpreter**
3. Click the gear icon in the top-right corner and select "Add..."
4. Choose "Existing Environment"
5. Click the "..." button and navigate to your virtual environment's Python executable:
   - For macOS/Linux: `ppt_gen/venv/bin/python`
   - For Windows: `ppt_gen\venv\Scripts\python.exe`
6. Click "OK" to apply the changes

## Manually Activating the Virtual Environment

If you're running scripts from the terminal, first activate the virtual environment:

### Windows:
