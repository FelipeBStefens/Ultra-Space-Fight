(function(){
  const cards = document.querySelectorAll('.achievement');
  let active = 0;

  function update(){
    cards.forEach((card, i) => {
      card.classList.remove('active', 'left', 'right');
      if(i === active) card.classList.add('active');
      else if(i < active) card.classList.add('left');
      else if(i > active) card.classList.add('right');
    });
  }

  document.getElementById('leftButton').addEventListener('click', () => {
    if(active > 0) active--;
    update();
  });

  document.getElementById('rightButton').addEventListener('click', () => {
    if(active < cards.length - 1) active++;
    update();
  });

  update();
})
();