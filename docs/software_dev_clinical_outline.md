# **Lecture Title:** Software Development for Clinical Use in Pathology

---

**SLIDE 1: Title Slide**  

- Lecture Title  
- Peter Gershkovich, MD. MHA  
- Yale University School of Medicine | June 2025

---

**SLIDE 2: Introduction**  

- Why pathology residents should care about software: LIS limitations, workflow inefficiencies, unmet needs.
- Custom software can improve diagnostics, communication, and safety.
- Real-world impact: frozen section alerts, digital image management, urgent case triage.

---

**SLIDE 3: Why Build Custom Software?**  

- Tailored to your lab's needs and workflow — especially important for subspecialty services.
- Enables integration with external systems (EHRs, image viewers, AI pipelines).
- Supports innovation and regulatory adaptation (e.g., NGS reporting, frozen sections).
- **From Gershkovich & Sinard**: Functionality gaps arise when needed tech exists but isn't in your LIS.

---

**SLIDE 4: Challenges to Be Aware Of**  

- Development effort requires domain understanding.
- Validation and long-term support must be considered.
- Institutional inertia: "we're not in the software business" is often a myth.
- **From Sinard & Gershkovich**: Even one or two developers with domain knowledge can be effective.

---

**SLIDE 5: Software Lifecycle & DevSecOps in Pathology**  

**Development Phases**
1. **Requirement Gathering** – Start with specific use cases from the clinical workflow.
2. **Functional Specification** – What should the system do? Create screen diagrams, button behaviors, exceptions.
3. **Technical Specification** – Database, architecture, and performance planning.
4. **Implementation and Testing** – Use version control, containers (Docker), staging environments.
5. **Security and Compliance** – HIPAA, access logs, secure APIs.
6. **Deployment & Feedback Loop** – Track usage and iterate.

---

**SLIDE 6: DevSecOps Philosophy**  

- Secure-by-design.
- Rapid, adaptive iterations.
- Infrastructure-as-code and automation.
- **Key point**: LIS vendors often cannot move fast enough due to outdated architecture.

---

**SLIDE 7: Image Analysis & AI**  

- **QPath** – Use Groovy scripts to quantify cell populations, analyze TILs, or export tiles for deep learning.
- **ImageJ/Fiji** – Open-source, powerful for smaller ROI and pixel-level analysis.
- **HistomicsTK** – Feature extraction and visualization for whole slide images.

---

**SLIDE 8: Digital Pathology Infrastructure**  

- **Digital Slide Archive (DSA)** – WSI management with REST APIs.
- **OpenSeadragon** – Lightweight JS-based WSI viewer you can embed in web tools.
- **Open Source Repositories** – GitHub, SourceForge, MONAI.

---

**SLIDE 9: Clinical Applications**  

- Alerting systems for STAT/RUSH cases.
- Specimen tracking and intraoperative diagnosis tools.
- NGS variant interpretation modules.

---

**SLIDE 10: Spotting Gaps in Workflow**  

- What is frustrating in your daily workflow? What leads to delays, errors, or repetitive effort?
- **From lecture material**: If your LIS doesn't notify you of STAT slides without a resident, that's a gap.

---

**SLIDE 11: Solutions**  

- **7 Options**: Ignore, patch manually, switch LIS, request vendor fix, outsource, build yourself, or integrate OSS.
- Residents can help design or prototype solutions with Jupyter Notebooks, low-code tools.
- Learn to write or read functional specs to guide developers.

---

**SLIDE 12: Conclusion and Call to Action**  

- Pathology informatics is a core discipline – not optional.
- Custom software development is powerful, cost-effective, and sustainable.
- You can participate by reporting gaps, helping design use cases, or even coding solutions.
- Every meaningful tool starts with someone who understood the problem deeply.

---

**SLIDE 13: Q&A and Demo Time**  

- Live demo of QPath on an H&E slide.
- Jupyter notebook using DSA API to pull case info.
- Discussion: What bugs you the most in your LIS today — and what would you build to fix it?

---

**SLIDE 14: Workflow Augmentation Example**  

- Interactive demo of server-side processing with audio feedback
- Text input field with validation for special characters
- Success feedback: "Whoosh" sound for valid input
- Error feedback: "Dope" sound when input contains $ or # characters
- Demonstrates integration of user input, server processing, and multimedia feedback
