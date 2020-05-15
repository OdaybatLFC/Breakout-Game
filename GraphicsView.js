/* @name: GraphicsView.js
 * @effects: This file controls what changes users will see when playing the Breakout Game
 * @author: Aleksandar Odaybat
 */

function GraphicsView() {
    let svgPaddle = document.getElementById("mySVG");
    let svgBall = document.getElementById("ball");
    let model = new GraphicsModel();

    this.init = function () {
        let timer = setInterval(function() {
            model.init();
            if (parseFloat(svgBall.getAttribute("cy")) === 97) {
                clearInterval(timer);
            }
        }, 10);

        if(window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", function (event) {
                let g = Math.round(event.gamma);
                if(g * 2 < 38 && g * 2 > -38) {
                    let move = 37.5 + Math.round(g * 2);    // here paddle will move depending on value of gamma
                    svgPaddle.style.left = move + "%";
                }
            });
        }
    };
}