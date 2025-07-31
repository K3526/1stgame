let player = { x: 400, y: 300, speed: 3 };
let autoMode = false;
let ctx;
let joystick;

function drawPlayer() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(player.x - 10, player.y - 10, 20, 20);
}

function update() {
    ctx.clearRect(0, 0, 800, 600);

    if (autoMode) {
        player.x += Math.cos(Date.now() / 300) * 2;
        player.y += Math.sin(Date.now() / 300) * 2;
    } else {
        player.x += joystick.value.x * player.speed;
        player.y += joystick.value.y * player.speed;
    }

    drawPlayer();
    requestAnimationFrame(update);
}

window.onload = function () {
    const canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    joystick = new Joystick(
        document.getElementById("joystick-container"),
        document.getElementById("joystick")
    );

    document.getElementById("auto-btn").addEventListener("click", () => {
        autoMode = !autoMode;
    });

    update();
};
