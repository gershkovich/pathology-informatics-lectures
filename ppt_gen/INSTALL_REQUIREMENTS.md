# Installing Requirements for PPT Generator

## Error: "No matching distribution found for requirements, txt"

If you're seeing this error, it means you're trying to install the requirements file incorrectly.

## Correct Way to Install Requirements

### For macOS/Linux:

1. Navigate to the ppt_gen directory:
   ```
   cd /path/to/pathology-informatics-lectures/ppt_gen
   ```

2. Activate the virtual environment:
   ```
   source venv/bin/activate
   ```

3. Install the requirements using the `-r` flag:
   ```
   pip install -r requirements.txt
   ```

### For Windows:

1. Navigate to the ppt_gen directory:
   ```
   cd \path\to\pathology-informatics-lectures\ppt_gen
   ```

2. Activate the virtual environment:
   ```
   venv\Scripts\activate.bat
   ```

3. Install the requirements using the `-r` flag:
   ```
   pip install -r requirements.txt
   ```

## Common Mistakes to Avoid

- Don't use a comma: `pip install requirements, txt` ❌
- Don't forget the `-r` flag: `pip install requirements.txt` ❌
- Don't include spaces in the filename: `pip install -r "requirements.txt"` is only needed if the path has spaces

## Using the make_sounds.py Script

After installing the requirements correctly, you can run the make_sounds.py script to generate the sound files:

```
python make_sounds.py
```

This will create two sound files:
- whoosh.mp3 - for success sounds
- doop.mp3 - for error sounds

These sound files can be used in the presentation's interactive example.