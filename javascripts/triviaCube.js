window.onload = function() {
    console.log('loaded cube.js script')
    getCategories();

    cubeSize = 165
    width = window.innerWidth;
    height = window.innerHeight;
    numberOfCubes = (width/cubeSize) * (height/cubeSize)
    
    // debugCubes()
    loadCubes(numberOfCubes)
}

function debugCubes() {
    console.log('%s x %s window', width, height);
    console.log('%s cubes x %s cubes with size %s', 
    Math.floor(width/cubeSize), Math.floor(height/cubeSize), cubeSize);
}

function loadCubes(amount){
    console.log('loading %s cubes', Math.floor(amount))
    grid = document.getElementById('grid')
    for (let i = 0; i <= amount; i++) {
        var hex = document.createElement('div');
        hex.setAttribute('class', 'hex');
        hex.setAttribute('id', "H"+i);

        grid.appendChild(hex);
    }

    animate()
}

function animate(){
    intro = intro();
    intro.play();
    intro.finished.then(() => {
        breathe = breathe();
        breathe.play();
    })
}

///////////////////////////////////// ANIMATIONS ///////////////////////////////////////

function intro(){
    return anime({
        targets: '.hex',
        rotate: [{value: 120, easing: 'easeOutSine', duration: 15000}],
        scale: [
            {value: 2, duration: 0},
            {value: 1, easing: 'easeInOutQuad', duration: 15000}
          ],
    });
}

function breathe() {
    return anime({
        targets: '.hex',
        loop: true,
        duration: 2000,
        // rotate: 120,
        scale: [
          {value: .1, easing: 'easeOutSine', duration: 15000},
          {value: 1, easing: 'easeInOutQuad', duration: 15000}
        ],
        delay: anime.stagger(5000, {
            grid: [screen.width/cubeSize, 
            screen.height/cubeSize], from: 'center'
        })
    });
}

function backgroundColor(color) {
    hexCode = '#000000';
    if (color == 'green') {hexCode = '#00ff00'}
    if (color == 'red') {hexCode = '#ff0000'}
    if (color == 'none') {hexCode = '#4F518C'}
    return anime({
        targets: 'body',
        backgroundColor: [
            {value: hexCode, easing: 'easeOutSine', duration: 1000},
            {value: hexCode, easing: 'easeInOutQuad', duration: 1000}
          ],
    });
}