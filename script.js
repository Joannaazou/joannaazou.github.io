const artworks = document.querySelectorAll(".art");

const viewer = document.getElementById("viewer");

const viewerImage = document.getElementById("viewer-image");

const closeButton = document.getElementById("close");

const title = document.getElementById("art-title");

const text = document.getElementById("art-text");


/* =========================
   Initial artwork positions
   ========================= */

const positions = [

    [8, 20],
    [42, 10],
    [72, 25],
    [18, 45],
    [55, 40],

    [82, 55],
    [5, 70],
    [38, 65],
    [65, 75],
    [25, 85],

    [78, 90],
    [12, 100],
    [50, 105],
    [88, 110],
    [35, 120],

    [70, 125],
    [5, 135],
    [45, 140],
    [82, 145],
    [25, 150]

];


artworks.forEach((art, index) => {

    art.style.left = positions[index][0] + "%";

    art.style.top = positions[index][1] + "px";

    art.style.zIndex = index;

});


/* =========================
   Dragging
   ========================= */

artworks.forEach((art) => {

    let isDragging = false;

    let startX;
    let startY;

    let originalX;
    let originalY;

    let moved = false;


    art.addEventListener("mousedown", (event) => {

        isDragging = true;

        moved = false;

        startX = event.clientX;

        startY = event.clientY;

        originalX = art.offsetLeft;

        originalY = art.offsetTop;

        art.style.zIndex = 1000;

    });


    document.addEventListener("mousemove", (event) => {

        if (!isDragging) return;

        const dx = event.clientX - startX;

        const dy = event.clientY - startY;

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {

            moved = true;

        }

        art.style.left = originalX + dx + "px";

        art.style.top = originalY + dy + "px";

    });


    document.addEventListener("mouseup", () => {

        isDragging = false;

    });


    /* =========================
       Click to open
       ========================= */

    art.addEventListener("click", () => {

        if (moved) return;

        viewer.style.display = "flex";

        viewerImage.src = art.src;

        title.textContent = "Artwork";

        text.textContent =
            "A drawing, an observation, a thought, or simply something I wanted to make.";

    });

});


/* =========================
   Close viewer
   ========================= */

closeButton.addEventListener("click", () => {

    viewer.style.display = "none";

});


viewer.addEventListener("click", (event) => {

    if (event.target === viewer) {

        viewer.style.display = "none";

    }

});
