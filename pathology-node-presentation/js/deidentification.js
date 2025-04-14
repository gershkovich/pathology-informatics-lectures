// JavaScript for HIPAA De-identification slide interactions

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the interactive elements when the slide becomes active
  Reveal.addEventListener('slidechanged', function(event) {
    // Check if the current slide is the de-identification slide
    if (event.currentSlide.classList.contains('deidentification-slide')) {
      initDeidentificationDemo();
    }
  });
});

function initDeidentificationDemo() {
  // Set up Safe Harbor toggle button
  const safeHarborBtn = document.getElementById('safe-harbor-toggle');
  if (safeHarborBtn) {
    safeHarborBtn.addEventListener('click', function() {
      toggleSafeHarborRedaction();
    });
  }
  
  // Set up Expert Determination toggle button
  const expertBtn = document.getElementById('expert-toggle');
  if (expertBtn) {
    expertBtn.addEventListener('click', function() {
      toggleExpertRedaction();
    });
  }
}

function toggleSafeHarborRedaction() {
  const dataExample = document.getElementById('safe-harbor-data');
  const fields = dataExample.querySelectorAll('.data-field');
  
  fields.forEach(field => {
    // Toggle redaction for identifiers that must be removed in Safe Harbor
    if (field.classList.contains('identifier')) {
      field.classList.toggle('redacted');
    }
  });
  
  // Update button text
  const button = document.getElementById('safe-harbor-toggle');
  if (button) {
    if (dataExample.querySelector('.redacted')) {
      button.textContent = 'Show Original Data';
    } else {
      button.textContent = 'Apply Safe Harbor Method';
    }
  }
}

function toggleExpertRedaction() {
  const dataExample = document.getElementById('expert-data');
  const fields = dataExample.querySelectorAll('.data-field');
  
  fields.forEach(field => {
    // For expert determination, some fields are redacted, others are modified
    if (field.classList.contains('high-risk')) {
      field.classList.toggle('redacted');
    } else if (field.classList.contains('medium-risk')) {
      field.classList.toggle('modified');
    }
  });
  
  // Update button text
  const button = document.getElementById('expert-toggle');
  if (button) {
    if (dataExample.querySelector('.redacted') || dataExample.querySelector('.modified')) {
      button.textContent = 'Show Original Data';
    } else {
      button.textContent = 'Apply Expert Determination';
    }
  }
}
