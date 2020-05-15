/* @name: GraphicsController.js
 * @effects: This file implements the view when app loads
 * @author: Aleksandar Odaybat
 */

function GraphicsController() {
    let view = new GraphicsView();

    this.init = function () {
        view.init();
    };
}

let controller = new GraphicsController();
window.addEventListener("load", controller.init);