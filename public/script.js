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
    misc.style.display = 'block';
  }
}
