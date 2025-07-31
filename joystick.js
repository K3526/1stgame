class Joystick {
    constructor(container, stick) {
        this.container = container;
        this.stick = stick;
        this.active = false;
        this.value = { x: 0, y: 0 };

        // 마우스 이벤트
        this.container.addEventListener("mousedown", this.start.bind(this));
        window.addEventListener("mousemove", this.move.bind(this));
        window.addEventListener("mouseup", this.end.bind(this));

        // 터치 이벤트
        this.container.addEventListener("touchstart", this.start.bind(this), { passive: false });
        window.addEventListener("touchmove", this.move.bind(this), { passive: false });
        window.addEventListener("touchend", this.end.bind(this));
    }

    start(evt) {
        evt.preventDefault();
        this.active = true;
        this.stick.style.transition = "0s";
    }

    move(evt) {
        if (!this.active) return;
        evt.preventDefault();

        let clientX, clientY;
        if (evt.changedTouches) {
            clientX = evt.changedTouches[0].clientX;
            clientY = evt.changedTouches[0].clientY;
        } else {
            clientX = evt.clientX;
            clientY = evt.clientY;
        }

        const rect = this.container.getBoundingClientRect();
        const dx = clientX - rect.left - rect.width / 2;
        const dy = clientY - rect.top - rect.height / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = rect.width / 2;

        if (dist > maxDist) {
            const angle = Math.atan2(dy, dx);
            this.value.x = Math.cos(angle);
            this.value.y = Math.sin(angle);
            this.stick.style.transform = `translate(${Math.cos(angle) * maxDist}px, ${Math.sin(angle) * maxDist}px)`;
        } else {
            this.value.x = dx / maxDist;
            this.value.y = dy / maxDist;
            this.stick.style.transform = `translate(${dx}px, ${dy}px)`;
        }
    }

    end() {
        this.active = false;
        this.value = { x: 0, y: 0 };
        this.stick.style.transition = ".2s";
        this.stick.style.transform = `translate(0px, 0px)`;
    }
}
