const artworks = document.querySelectorAll(".art");

const wall = document.getElementById("art-wall");

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
        description:
            "A drawing about observation and imagination."
    },

    {
        title: "Artwork 02",
        description:
            "A study of form, light, and space."
    },

    {
        title: "Artwork 03",
        description:
            "A visual experiment with color and composition."
    },

    {
        title: "Artwork 04",
        description:
            "A drawing inspired by everyday observations."
    },

    {
        title: "Artwork 05",
        description:
            "An exploration of shapes and atmosphere."
    },

    {
        title: "Artwork 06",
        description:
            "A study of movement and form."
    },

    {
        title: "Artwork 07",
        description:
            "An experiment with visual storytelling."
    },

    {
        title: "Artwork 08",
        description:
            "A drawing inspired by memory."
    },

    {
        title: "Artwork 09",
        description:
            "A study of space and atmosphere."
    },

    {
        title: "Artwork 10",
        description:
            "An exploration of line and composition."
    },

    {
        title: "Artwork 11",
        description:
            "A small visual experiment."
    },

    {
        title: "Artwork 12",
        description:
            "A drawing about observation."
    },

    {
        title: "Artwork 13",
        description:
            "An exploration of imagination."
    },

    {
        title: "Artwork 14",
        description:
            "A study of light and shadow."
    },

    {
        title: "Artwork 15",
        description:
            "A visual note from my sketchbook."
    },

    {
        title: "Artwork 16",
        description:
            "An experiment with form."
    },

    {
        title: "Artwork 17",
        description:
            "A drawing inspired by everyday life."
    },

    {
        title: "Artwork 18",
        description:
            "A study of atmosphere."
    },

    {
        title: "Artwork 19",
        description:
            "A visual experiment."
    },

    {
        title: "Artwork 20",
        description:
            "Something I wanted to draw."
    }

];


/* =========================
   Random artwork layout
   ========================= */

function arrangeArtworks() {

    const wallWidth = wall.clientWidth;

    const wallHeight = wall.clientHeight;

    const placed = [];


    artworks.forEach((art, index) => {

        const width = art.offsetWidth;

        const height = art.offsetHeight;


        let x;

        let y;

        let attempts = 0;

        let validPosition = false;


        while (!validPosition && attempts < 200) {

            /*
               Random horizontal position
            */

            x = Math.random() *
                Math.max(20, wallWidth - width - 40) + 20;


            /*
               Random vertical position

               This is the important part:
               the entire 2400px wall is used.
            */

            y = Math.random() *
                Math.max(100, wallHeight - height - 40) + 20;


            validPosition = true;


            /*
               Check distance from existing images
            */

            for (const other of placed) {

                const horizontalDistance =
                    Math.abs(x - other.x);

                const verticalDistance =
                    Math.abs(y - other.y);


                /*
                   Minimum spacing

                   Larger values = less overlap
                */

                if (
                    horizontalDistance < 250 &&
                    verticalDistance < 220
                ) {

                    validPosition = false;

                    break;
                }

            }


            attempts++;

        }


        /*
           Place artwork
        */

        art.style.left = x + "px";

        art.style.top = y + "px";


        placed.push({
            x: x,
            y: y
        });

    });

}


/*
   Wait until images are loaded
*/

window.addEventListener("load", () => {

    arrangeArtworks();

});


/* =========================
   Dragging
   ========================= */

artworks.forEach((art, index) => {

    let dragging = false;

    let moved = false;

    let startPointerX = 0;

    let startPointerY = 0;

    let startLeft = 0;

    let startTop = 0;


    /*
       Pointer pressed
    */

    art.addEventListener("pointerdown", (event) => {

        /*
           Only respond to primary pointer
        */

        if (!event.isPrimary) return;


        dragging = true;

        moved = false;


        startPointerX = event.clientX;

        startPointerY = event.clientY;


        startLeft = art.offsetLeft;

        startTop = art.offsetTop;


        /*
           Bring image to front
        */

        art.style.zIndex = 1000 + index;


        /*
           Capture pointer

           This prevents the drag from
           breaking when the pointer moves
           quickly.
        */

        art.setPointerCapture(event.pointerId);


        art.classList.add("dragging");


        event.preventDefault();

    });


    /*
       Pointer moves
    */

    art.addEventListener("pointermove", (event) => {

        if (!dragging) return;


        const dx =
            event.clientX - startPointerX;

        const dy =
            event.clientY - startPointerY;


        /*
           Only consider it a drag after
           moving at least 6 pixels.
        */

        if (
            Math.abs(dx) > 6 ||
            Math.abs(dy) > 6
        ) {

            moved = true;

        }


        if (moved) {

            art.style.left =
                startLeft + dx + "px";

            art.style.top =
                startTop + dy + "px";

        }

    });


    /*
       Pointer released
    */

    art.addEventListener("pointerup", (event) => {

        if (!dragging) return;


        dragging = false;


        art.classList.remove("dragging");


        /*
           Release pointer capture
        */

        if (
            art.hasPointerCapture(event.pointerId)
        ) {

            art.releasePointerCapture(
                event.pointerId
            );

        }

    });


    /*
       Pointer cancelled
    */

    art.addEventListener("pointercancel", () => {

        dragging = false;

        art.classList.remove("dragging");

    });


    /* =========================
       Click to open
       ========================= */

    art.addEventListener("click", (event) => {

        /*
           If the image was dragged,
           do NOT open the viewer.
        */

        if (moved) {

            event.preventDefault();

            return;

        }


        viewer.style.display = "flex";


        viewerImage.src = art.src;


        /*
           Artwork information
        */

        if (artworkInfo[index]) {

            title.textContent =
                artworkInfo[index].title;

            text.textContent =
                artworkInfo[index].description;

        }

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
