// ID of element to swipe
const elements = ["card", "year", "picture"];

const nbElement = 3;
let currentIdx = 1;
const right = 1;
const left = -1;

const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");

function update(name, dir) {
    const c = name + "-" + currentIdx;
    const n = name + "-" + (currentIdx + dir);
    const curr = document.querySelector("#" + c);
    const next = document.querySelector("#" + n);
    curr.classList.remove(c + "-active");
    curr.classList.add(c + "-" + (dir === left ? "right" : "left"));
    next.classList.remove(n + "-" + (dir === right ? "right" : "left"));
    next.classList.add(n + "-active");
};

function updateNaviguation() {
    // Arrow
    if (currentIdx === 1)
        arrowLeft.style.opacity = 0.2;
    else if (currentIdx === nbElement)
        arrowRight.style.opacity = 0.2;
    else {
        arrowLeft.style.opacity = 1;
        arrowRight.style.opacity = 1;
    }

    // Line
    for (let i = 1; i <= nbElement; i++) {
        const bullet = document.getElementById("bullet-" + i);
        const line = document.getElementById("line-" + (i - 1));

        if (i > currentIdx) {
            bullet.style.transitionDelay = "0ms";
            bullet.style.opacity = 0.3;
            if (line) {
                line.style.transitionDelay = "250ms";
                line.style.opacity = 0.3;
            }
        }
        else {
            bullet.style.transitionDelay = "250ms";
            bullet.style.opacity = 1;
            if (line) {
                line.style.opacity = 1;
                line.style.transitionDelay = "0ms";
            }
        }
    }
}

function swipeRight() {
    if (currentIdx >= nbElement)
        return;

    elements.forEach(el => update(el, right));
    currentIdx++;
    updateNaviguation();
}

function swipeLeft() {
    if (currentIdx <= 1)
        return;

    elements.forEach(el => update(el, left));
    currentIdx--;
    updateNaviguation();
}

document.addEventListener('keydown', e => {
    if (e.code === "ArrowLeft") 
        swipeLeft();
    else if (e.code === "ArrowRight")
        swipeRight();
});
arrowLeft.addEventListener("click", swipeLeft);
arrowRight.addEventListener("click", swipeRight);

// Initialize element
updateNaviguation();