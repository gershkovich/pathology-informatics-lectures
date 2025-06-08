# Software Development for Clinical Use in Pathology

This document provides information about the "Software Development for Clinical Use in Pathology" lecture presentation.

## Overview

This lecture covers the importance of custom software development in pathology, including benefits, challenges, software lifecycle, tools, and applications. It is designed for pathology residents to understand how custom software can improve diagnostics, communication, and safety in pathology workflows.

## Presentation Files

The presentation is available in two formats:

1. **HTML Presentation**: A web-based presentation using RevealJS
   - File: `/pathology-node-presentation/software_dev_clinical_use.html`
   - This is the recommended way to view the presentation

2. **PowerPoint Presentation**: A PowerPoint file generated using python-pptx
   - File: `/data/software_dev_clinical_use.pptx` (generated using the script)
   - Script: `/ppt_gen/software_dev_clinical_use.py`

## Running the HTML Presentation

To run the HTML presentation:

1. Navigate to the pathology-node-presentation directory:
   ```
   cd pathology-node-presentation
   ```

2. Install dependencies (if not already installed):
   ```
   npm install
   ```

3. Start the presentation server:
   ```
   node server.js
   ```

4. Open a web browser and navigate to:
   ```
   http://localhost:8000/software_dev_clinical_use.html
   ```

## Generating the PowerPoint Presentation

To generate the PowerPoint presentation:

1. Set up the Python environment:
   ```
   cd ppt_gen

   # For macOS/Linux
   chmod +x setup.sh
   ./setup.sh

   # For Windows
   setup.bat
   ```

2. Run the Python script:
   ```
   python software_dev_clinical_use.py
   ```

3. The PowerPoint file will be generated at:
   ```
   /data/software_dev_clinical_use.pptx
   ```

## Content Structure

The presentation consists of 14 slides:

1. **Title Slide**: Software Development for Clinical Use in Pathology
2. **Introduction**: Why pathology residents should care about software
3. **Why Build Custom Software?**: Benefits of custom software in pathology
4. **Challenges to Be Aware Of**: Considerations for custom software development
5. **Software Lifecycle & DevSecOps in Pathology**: Development phases
6. **DevSecOps Philosophy**: Secure-by-design and rapid iterations
7. **Image Analysis & AI**: Tools for image analysis
8. **Digital Pathology Infrastructure**: WSI management and viewers
9. **Clinical Applications**: Real-world applications
10. **Spotting Gaps in Workflow**: Identifying opportunities for improvement
11. **Solutions**: Options for addressing gaps
12. **Conclusion and Call to Action**: Importance of pathology informatics
13. **Q&A and Demo Time**: Interactive discussion and demonstrations
14. **Workflow Augmentation Example**: Interactive demo with server-side processing and audio feedback

## Source Material

The content for this presentation is based on the following files:
- Original content: `/docs/custom_development.md`
- Slide deck outline: `/docs/software_dev_clinical_outline.md`

## Interactive Features

### Workflow Augmentation Example

The presentation includes an interactive demo on slide 14 that demonstrates server-side processing with audio feedback:

- **Functionality**: Users can enter text in an input field and submit it for processing
- **Validation**: The server checks for special characters ($ and #)
- **Audio Feedback**: 
  - Success: A "whoosh" sound plays when input is processed successfully
  - Error: A "dope" sound plays when input contains special characters
- **Implementation Details**:
  - Client-side: HTML form with JavaScript for AJAX requests and audio playback
  - Server-side: Express.js endpoint that processes the input and returns JSON responses
  - Audio: Base64-encoded audio data URLs for sound effects

This example demonstrates how to integrate user input, server-side processing, and multimedia feedback in a clinical workflow application.

## Customization

To customize the presentation:

1. **HTML Presentation**: Edit the `/pathology-node-presentation/software_dev_clinical_use.html` file
2. **PowerPoint Generation**: Edit the `/ppt_gen/software_dev_clinical_use.py` script and regenerate the PowerPoint file
