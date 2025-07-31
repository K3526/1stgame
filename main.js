window.onload = function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // 캔버스 크기 맞추기
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.7;

    // 캐릭터 좌표
    let player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 30,
        speed: 2
    };

    // 조이스틱 관련 변수
    const joystick = document.getElementById("joystick");
    const stick = document.getElementById("stick");
    let touchStartX = 0, touchStartY = 0;
    let moveX = 0, moveY = 0;
    let moving = false;

    // 조이스틱 드래그 시작
    joystick.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        moving = true;
    });

    // 조이스틱 드래그 중
    joystick.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        moveX = touch.clientX - touchStartX;
        moveY = touch.clientY - touchStartY;

        // 스틱 위치 제한
        const maxDistance = 40;
        const dist = Math.min(Math.sqrt(moveX ** 2 + moveY ** 2), maxDistance);
        const angle = Math.atan2(moveY, moveX);
        stick.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
    });

    // 조이스틱 드래그 끝
    joystick.addEventListener("touchend", () => {
        moving = false;
        stick.style.transform = `translate(0px, 0px)`;
        moveX = 0;
        moveY = 0;
    });

    // 그리기 함수
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 배경
        ctx.fillStyle = "#222";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 캐릭터
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();

        // 이동 처리
        if (moving) {
            const length = Math.sqrt(moveX ** 2 + moveY ** 2);
            if (length > 0) {
                player.x += (moveX / length) * player.speed;
                player.y += (moveY / length) * player.speed;
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
};
