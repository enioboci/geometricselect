document.getElementById('shapeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateGrid();
});

let selectedElements = [];

function generateGrid() {
    const shape = document.getElementById('shape').value;
    const rows = document.getElementById('rows').value;
    const cols = document.getElementById('cols').value;

    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const div = document.createElement('div');
            div.classList.add('grid-item');
            div.dataset.row = i;
            div.dataset.col = j;
            div.addEventListener('click', function() {
                selectElement(div);
            });
            gridContainer.appendChild(div);
        }
    }
}

function selectElement(element) {
    element.classList.toggle('selected');
    const row = element.dataset.row;
    const col = element.dataset.col;
    const index = selectedElements.findIndex(el => el.row == row && el.col == col);

    if (index === -1) {
        selectedElements.push({ row, col });
    } else {
        selectedElements.splice(index, 1);
    }
    updateSidebar();
}

function updateSidebar() {
    const accordion = document.getElementById('accordionExample');
    accordion.innerHTML = '';

    selectedElements.forEach((el, index) => {
        const item = document.createElement('div');
        item.classList.add('accordion-item');

        const header = document.createElement('h2');
        header.classList.add('accordion-header');
        header.id = `heading${index}`;

        const button = document.createElement('button');
        button.classList.add('accordion-button', 'collapsed');
        button.type = 'button';
        button.dataset.toggle = 'collapse';
        button.dataset.target = `#collapse${index}`;
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('aria-controls', `collapse${index}`);
        button.innerText = `Element at (${el.row}, ${el.col})`;

        header.appendChild(button);

        const collapse = document.createElement('div');
        collapse.id = `collapse${index}`;
        collapse.classList.add('accordion-collapse', 'collapse');
        collapse.setAttribute('aria-labelledby', `heading${index}`);
        collapse.dataset.parent = '#accordionExample';

        const body = document.createElement('div');
        body.classList.add('accordion-body');
        body.innerHTML = `<strong>Element Details:</strong><br>Row: ${el.row}<br>Column: ${el.col}`;

        collapse.appendChild(body);
        item.appendChild(header);
        item.appendChild(collapse);

        accordion.appendChild(item);
    });
}
