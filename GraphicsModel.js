/* @name: GraphicsModel.js
 * @effects: This file models the changes of the ball users will see when playing the Breakout Game
 * @author: Aleksandar Odaybat
 */

function GraphicsModel() {
    let svgPaddle = document.getElementById("mySVG");
    let svgBall = document.getElementById("ball");
    let xBall = parseFloat(svgBall.getAttribute("cx"));
    let yBall = parseFloat(svgBall.getAttribute("cy"));
    let blocks = document.getElementsByTagName("rect");
    let rate = 0;
    let up = true;
    let down = false;

    this.init = function () {
        if (up) {
            moveUp();
        }
        else if (down) {
            moveDown();
        }
        else {
            console.log("Game over!");
        }
    };

    function moveUp() {
        updateCoordinates("cx", -rate);
        updateCoordinates("cy", -0.5);
        checkForContact();
    }

    function moveDown() {
        updateCoordinates("cy", 0.5);
        updateCoordinates("cx", -rate);
        checkForContact();
    }

    function updateCoordinates(axis, amount) {
        if (axis === "cy") {
            yBall = yBall + amount;
            svgBall.setAttribute(axis,  yBall + '%');
        }
        else {
            xBall = xBall + amount;
            svgBall.setAttribute(axis,  xBall + '%');
        }
    }

    function checkForContact() {
        // here we check if the ball touches the side walls
        if (xBall < 4 || xBall > 96) {
            rate = -rate;
        }
        for (i = 1; i < blocks.length; i++) {
            let yBlock = parseFloat(blocks[i].getAttribute("y"));
            let xBlock = parseFloat(blocks[i].getAttribute("x"));
            if(yBall === yBlock + 7.5 || yBall === yBlock - 3) {
                if (blocks[i].style.display != "none" && xBlock - 1 < xBall && xBlock + 20 > xBall) {
                    up = false;
                    down = true;
                    blocks[i].style.display = "none";
                }
            }
            if ((xBall + 2 < xBlock && xBall + 2 + rate > xBlock) || (xBall > xBlock + 21 && xBall + rate < xBlock + 21)) {
                if (blocks[i].style.display != "none" && yBlock + 4.5 > yBall && yBlock < yBall) {
                    rate = -rate;
                    blocks[i].style.display = "none";
                }
            }
        }
        // here we check for contact with the top wall
        if(yBall === 2) {
            up = false;
            down = true;
        }
        // here we check for contact with the paddle
        if (yBall === 85) {
            let xPaddle = parseFloat(svgPaddle.style.left);
            if(xBall > xPaddle && xBall < xPaddle + 25) {
                up = true;
                down = false;
                rate = (xPaddle + 12.5 - xBall) / 7.00  // here we change the rate from which the ball will move around its x-axis
            }                                           // it depends on the contact with the paddle
        }
        // here we check if the ball did not touch the paddle (i.e. it is game over)
        if(yBall === 100) {
            up = down = false;
        }
    }
}