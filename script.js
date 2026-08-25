const artworks = document.querySelectorAll(".art");

const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewer-image");
const closeButton = document.getElementById("close");

const title = document.getElementById("art-title");
const text = document.getElementById("art-text");


/* =========================
   Artwork information
   ========================= */

const artworkInfo = [
    {
        title: "Artwork 01",
        description: "A drawing about observation and imagination."
    },

    {
        title: "Artwork 02",
        description: "A study of form, light, and space."
    },

    {
        title: "Artwork 03",
        description: "A visual experiment with color and composition."
    },

    {
        title: "Artwork 04",
        description: "A drawing inspired by everyday observations."
    },

    {
        title: "Artwork 05",
        description: "An exploration of shapes and atmosphere."
    }
];


/* =========================
   Initial positions
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

artworks.forEach((art, index) => {

    let isDragging = false;

    let startX = 0;
    let startY = 0;

    let originalX = 0;
    let originalY = 0;

    let moved = false;


    /*
       Mouse button pressed
    */

    art.addEventListener("mousedown", (event) => {

        /*
           Only respond to left mouse button
        */

        if (event.button !== 0) return;


        isDragging = true;

        moved = false;

        startX = event.clientX;
        startY = event.clientY;

        originalX = art.offsetLeft;
        originalY = art.offsetTop;

        art.style.cursor = "grabbing";

        art.style.zIndex = 1000;

    });


    /*
       Mouse movement
    */

    document.addEventListener("mousemove", (event) => {

        if (!isDragging) return;


        const dx = event.clientX - startX;
        const dy = event.clientY - startY;


        /*
           Only count as dragging after
           the mouse has actually moved
        */

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {

            moved = true;

        }


        /*
           Move the artwork
        */

        if (moved) {

            art.style.left = originalX + dx + "px";

            art.style.top = originalY + dy + "px";

        }

    });


    /*
       Mouse released
    */

    document.addEventListener("mouseup", () => {

        if (!isDragging) return;

        isDragging = false;

        art.style.cursor = "grab";

    });


    /*
       Click
       
       If the user did NOT drag the image,
       open the artwork viewer.
    */

    art.addEventListener("click", () => {

        if (moved) return;


        viewer.style.display = "flex";

        viewerImage.src = art.src;


        /*
           Use artwork information
        */

        if (artworkInfo[index]) {

            title.textContent =
                artworkInfo[index].title;

            text.textContent =
                artworkInfo[index].description;

        } else {

            title.textContent = "Artwork";

            text.textContent =
                "A drawing, an observation, a thought, or something I wanted to make.";

        }

    });

});


/* =========================
   Close viewer
   ========================= */

closeButton.addEventListener("click", () => {

    viewer.style.display = "none";

});


/*
   Click outside the artwork
   to close viewer
*/

viewer.addEventListener("click", (event) => {

    if (event.target === viewer) {

        viewer.style.display = "none";

    }

});
