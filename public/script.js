function setHyphenLines() {
  const separatorLines = document.querySelectorAll('.separator-line');
  separatorLines.forEach((line) => {
    const bodyWidth = document.body.clientWidth;
    const separatorWidth = bodyWidth * 0.4; // 40% of the body width
    const hyphenElement = document.createElement('span');
    hyphenElement.style.fontFamily = 'monospace'; // Ensure monospace for measurement

    // Add a single hyphen temporarily to calculate its width
    hyphenElement.textContent = '-';
    document.body.appendChild(hyphenElement);
    const hyphenWidth = hyphenElement.offsetWidth;
    document.body.removeChild(hyphenElement);

    // Calculate how many hyphens fit into 40% of the body's width
    const numHyphens = Math.floor(separatorWidth / hyphenWidth);
    line.textContent = '-'.repeat(numHyphens);
  });
}

// Call the function to set hyphen lines on page load
setHyphenLines();

// Recalculate hyphens if the window is resized
window.addEventListener('resize', setHyphenLines);

function toggleCat() {
  const cat = document.querySelector('input[name="category"]:checked').value;
  const misc = document.getElementById('Misc-Opt');

  if (cat === 'any') {
    misc.style.display = 'none';

    const checkboxes = misc.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  } else if (cat === 'misc') {
    misc.style.display = 'grid';
  }
}
