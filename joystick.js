const joystick = document.getElementById('joystick');
const stick = document.getElementById('stick');

let dragging = false;
let startX, startY;

joystick.addEventListener('touchstart', function (e) {
    dragging = true;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;

    // 조이스틱을 손가락 시작 위치로 이동
    joystick.style.left = `${startX - joystick.offsetWidth / 2}px`;
    joystick.style.top = `${startY - joystick.offsetHeight / 2}px`;
});

joystick.addEventListener('touchmove', function (e) {
    if (!dragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;

    // 안쪽 스틱 이동 (손가락 위치 비율)
    const maxDistance = 50;
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
    const angle = Math.atan2(dy, dx);

    stick.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;

    // 플레이어 속도 반영
    player.dx = Math.cos(angle) * player.speed * (distance / maxDistance);
    player.dy = Math.sin(angle) * player.speed * (distance / maxDistance);

    e.preventDefault();
}, { passive: false });

joystick.addEventListener('touchend', function () {
    dragging = false;

    // 스틱 원래 자리로 부드럽게 복귀
    stick.style.transition = '0.2s';
    stick.style.transform = 'translate(0px, 0px)';
    setTimeout(() => {
        stick.style.transition = '0s';
    }, 200);

    player.dx = 0;
    player.dy = 0;
});
