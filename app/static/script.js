const grids = document.querySelectorAll('.grid');
const headings = document.querySelectorAll('.heading .wrapper .text');
const images = ['/eu.jpeg', '/suga.png', '/az.jpg'];
let currentImageIndex = 0;

function enterScreen(index) {
  const grid = grids[index];
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll('.column');

  grid.classList.add('active');

  gridColumns.forEach((element) => {
    element.classList.remove('animate-before', 'animate-after');
  });

  heading.classList.remove('animate-before', 'animate-after');
}

function exitScreen(index, exitDelay) {
  const grid = grids[index];
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll('.column');

  gridColumns.forEach((element) => {
    element.classList.add('animate-after');
  });

  heading.classList.add('animate-after');

  setTimeout(() => {
    grid.classList.remove('active');
  }, exitDelay);
}

function setupAnimationCycle({ timePerScreen, exitDelay }) {
  const cycleTime = timePerScreen + exitDelay;
  let nextIndex = 0;

  function nextCycle() {
    const currentIndex = nextIndex;
    const currentImage = images[currentImageIndex];
    const items = grids[currentIndex].querySelectorAll('.item');

    items.forEach((item) => {
      item.style.backgroundImage = `url(${currentImage})`;
    });

    enterScreen(currentIndex);

    setTimeout(() => exitScreen(currentIndex, exitDelay), timePerScreen);

    nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1;
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }

  nextCycle();

  setInterval(nextCycle, cycleTime);
}

setupAnimationCycle({
  timePerScreen: 2000, // ms
  exitDelay: 200 * 7, // ms
});
