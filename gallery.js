// Load gallery data
fetch('gallery-data.json')
  .then(response => response.json())
  .then(data => {
    // Sort by date (newest first)
    const pieces = data.pieces.sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    // Generate gallery grid
    const grid = document.getElementById('gallery-grid');
    pieces.forEach(piece => {
      const item = document.createElement('a');
      item.href = '#';
      item.className = 'gallery-item';
      item.onclick = (e) => {
        e.preventDefault();
        openModal(piece);
      };
      
      item.innerHTML = `
        <img src="${piece.image}" alt="${piece.title}" loading="lazy">
        <p>${piece.title}</p>
      `;
      
      grid.appendChild(item);
    });
  });

// Modal functions
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');

function openModal(piece) {
  document.getElementById('modal-img').src = piece.image;
  document.getElementById('modal-title').textContent = piece.title;
  document.getElementById('modal-resolution').textContent = `Resolution: ${piece.resolution}`;
  document.getElementById('modal-desc').innerHTML = piece.description;


/*
  // Generate color swatches
  const colorsDiv = document.getElementById('modal-colors');
  colorsDiv.innerHTML = '';
  piece.palette.forEach(color => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = color;
    swatch.setAttribute('data-hex', color);
    colorsDiv.appendChild(swatch);
  });
  */
  modal.style.display = 'block';
}


// Close modal
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = 'none';
};