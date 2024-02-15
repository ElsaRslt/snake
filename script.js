// listes des choses à faire :

// faire le canva ok 
// positionner la tete du serpent sur le canvas ok
// faire le corps du serpent  ok 
// faire bouger le serpent ok
// faire bouger le serpent avec les fleches du clavier ok 
// faire apparaitre la nourriture de facon aléatoire sur le canvas ok 
// rajouter un morceau au serpent quand il mange un truc ok
// tuer le serpent et stopper le jeu s'il touche un mur ou lui même ok 
// rajouter un compteur de point ok

// en option : 

// demander au jouer la taille du plateau ok
// demande au jouer la vitesse du serpent 

//width="600" height="600"



const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

let canvasSize
let centreX
let centreY
let snake = [];
const blockSize = 20;
let game
let vitesse
let colorSnake
let gameColor

// selectionner la vitesse du serpent
const selectVitesse = document.getElementById("vitesseSnake");
selectVitesse.addEventListener('change', intiGame);


// selectionner la taille du plateau 
const selectTaille = document.getElementById("tailleCanvas");
selectTaille.addEventListener('change', intiGame);

// selectionne la couleur du plateau 
const colorGame = document.getElementById("colorBgc");
colorGame.addEventListener('change', intiGame);

// selectionne la couleur de la tete du snake
const selectColor = document.getElementById("colorSnake");
selectColor.addEventListener('change', intiGame);



function intiGame() {

    clearInterval(game)
    
    // Recuperer la taille du plateau 
    canvasSize = Number(selectTaille.options[selectTaille.selectedIndex].value);
    document.getElementById("canvas").width = canvasSize;
    document.getElementById("canvas").height = canvasSize;
    centreX = canvasSize / 2;
    centreY = canvasSize / 2;
    
    // recuperer la vitesse du serpent 

    vitesse = Number(selectVitesse.options[selectVitesse.selectedIndex].value);


    // recuperer la couleur de la tête du serpent
    colorSnake = selectColor.options[selectColor.selectedIndex].value;

    // recuperer la couleur du plateau 
    gameColor = colorGame.options[colorGame.selectedIndex].value;
    document.getElementById("canvas").style.backgroundColor = gameColor ;

    //tête du snake au milieu de la page 
    snake[0] = {
        x: centreX,
        y: centreY,
    }


    // faire apparaitre la nourriture sur le plateau 
    let food = {
        x: Math.floor((Math.random() * 15) + 1) * blockSize,
        y: Math.floor((Math.random() * 15) + 1) * blockSize,
    }


    // faire bouger le serpent avec les fleches du clavier 

    let d

    window.addEventListener("keydown", direction);

    function direction(e) {
        // switch (e.code){
        //     case "ArrowUp": 
        //         //if(snake[0].y - blockSize >=0)
        //         {
        //             snake[0].y -= blockSize;
        //         }
        //         break;
        //     case "ArrowDown": 
        //         //if(snake[0].y + blockSize + blockSize <= canvas.height)
        //         { 
        //             snake[0].y += blockSize;
        //         } 
        //         break;
        //     case "ArrowLeft": 
        //         //if(snake[0].x - blockSize >= 0)
        //         {
        //             snake[0].x -= blockSize;
        //         } 
        //         break;
        //     case "ArrowRight":
        //         //if(snake[0].x + blockSize + blockSize <= canvas.width)
        //         { 
        //             snake[0].x += blockSize;
        //     } 
        //         break
        // }
        let key = e.code;
        if (key == 'ArrowLeft' && d != "RIGHT") {
            d = "LEFT";
        } else if (key == 'ArrowUp' && d != "DOWN") {
            d = "UP";
        } else if (key == 'ArrowDown' && d != "UP") {
            d = "DOWN";
        } else if (key == 'ArrowRight' && d != "LEFT") {
            d = "RIGHT";
        };
    }

    // Score 

    let score = 0

    // fonction pour dessiner le snake et la food sur le plateau 
    function draw() {
        ctx.clearRect(0, 0, canvasSize, canvasSize)

        // faire le corps du serpent avec une boucle

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i == 0) ? colorSnake : " white";
            ctx.fillRect(snake[i].x, snake[i].y, blockSize, blockSize);
            ctx.strokeStyle = "blue";
            ctx.strokeRect(snake[i].x, snake[i].y, blockSize, blockSize);
        }

        // faire apparaitre la bouffe 
        ctx.fillStyle = "red"
        ctx.fillRect(food.x, food.y, blockSize, blockSize);

        // avoir la position de la tete du serpent 
        let snakeX = snake[0].x
        let snakeY = snake[0].y


        // faire bouger la tete du snake 
        if (d == "LEFT") snakeX -= blockSize
        if (d == "UP") snakeY -= blockSize
        if (d == "RIGHT") snakeX += blockSize
        if (d == "DOWN") snakeY += blockSize

        // ajouter bloc au serpent s'il arrive a manger
        if (snakeX == food.x && snakeY == food.y) {
            score++;
            food = {
                x: Math.floor((Math.random() * 15) + 1) * blockSize,
                y: Math.floor((Math.random() * 15) + 1) * blockSize,
            }
        } else {
            snake.pop()
        }

        let newHead = {
            x: snakeX,
            y: snakeY,
        }
        
        // si le snake se touche ou touche un mur. Fin du jeu 
        if (snakeX < 0 || snakeY < 0 || snakeX > canvasSize || snakeY > canvasSize || collision(newHead, snake)) {
            alert("Game Over")
            clearInterval(game)
        }

        // mise à jour des reultats
        snake.unshift(newHead);
        ctx.fillStyle = "red"
        ctx.font = "30px Arial"
        ctx.fillText(score, 2 * blockSize, 1.6 * blockSize)
        //console.log("coucou")
    }

    // si le snake se touche tout seul comme un gland car c'esr un snake 
    function collision(head, array) {
        for (let g = 0; g < array.length; g++) {
            if (head.x == array[g].x && head.y == array[g].y) {
                return true;
            }
        }
        return false
    }

    game = setInterval(draw, vitesse)

   // console.log("bonjour")
}


intiGame()



