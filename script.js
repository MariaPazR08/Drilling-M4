const ranges = [
    { id: "range1-5", min: 1, max: 5, listId: "list1-5" },
    { id: "range6-11", min: 6, max: 11, listId: "list6-11" },
    { id: "range12-17", min: 12, max: 17, listId: "list12-17" }
  ];
  
  ranges.forEach(range => {
    const rangeElement = document.getElementById(range.id);
    const listElement = document.getElementById(range.listId);
  
    rangeElement.addEventListener('mouseenter', () => {
      if (listElement.children.length === 0) {
        fetchCharacters(range.min, range.max, listElement);
      }
    });
  });
  
  function fetchCharacters(min, max, listElement) {
    for (let i = min; i <= max; i++) {
      fetch(`https://swapi.dev/api/people/${i}/`)
        .then(response => response.json())
        .then(data => {
          const li = document.createElement('li');
          li.textContent = data.name;
          li.addEventListener('click', () => displayCharacter(data));
          listElement.appendChild(li);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }
  
  function displayCharacter(character) {
    const details = document.getElementById('character-details');
    details.innerHTML = `
      <p><strong>Name:</strong> ${character.name}</p>
      <p><strong>Height:</strong> ${character.height} cm</p>
      <p><strong>Mass:</strong> ${character.mass} kg</p>
      <p><strong>Gender:</strong> ${character.gender}</p>
      <p><strong>Birth Year:</strong> ${character.birth_year}</p>
    `;
  }
  