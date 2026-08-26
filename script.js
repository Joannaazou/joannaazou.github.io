const artworks = document.querySelectorAll(".art");

const wall = document.getElementById("art-wall");

const viewer = document.getElementById("viewer");

const viewerImage = document.getElementById("viewer-image");

const closeButton = document.getElementById("close");

const title = document.getElementById("art-title");

const text = document.getElementById("art-text");

let highestZIndex = 10;

/* =========================
   Artwork information
   ========================= */

const artworkInfo = [

    {
        title: "Green Beans (Young)",
        description:
            "Colored Pencil | The dark leaves at the bottom are the cotyledons; actually the three on top are the green bean’s true leaves."
    },

    {
        title: "Manga Cover Typography Design",
        description:
            "Digital | Custom Chinese typography design for manga in Chuman platform - cover titles and logo lettering for manga series"
    },

    {
        title: "BiXia Pound",
        description:
            "Digital | Campus ID Card Sleeve Design @ Suzhou High School of Jiangsu Province\n“BiXia” in Chinese means the azure mist. The brown-scarred geese and the light-glazed lake are impressions from my daily walks"
    },

    {
        title: "Hollyhock (Alcea Rosea)",
        description:
            "Colored Pencil | Also known as "A Zhang of Red" in Suzhou. They signal the coming of Mid-autumn Festival, and their petals are large - like umbrellas."
    },

    {
        title: "Cucumbers (Young)",
        description:
            "Colored Pencil | Every summer in my home backyard, my grandma would set up trellis for the cucumbers to grow."
    },

    {
        title: "Untitled",
        description:
            "Pen | Creative line art tryout"
    },

    {
        title: "Beetroot",
        description:
            "Colored Pencil | The leaves of beetroots are very curly."
    },

    {
        title: "Sweet Potato",
        description:
            "Colored Pencil | Unlike cucumbers, sweet potatoes creep along the ground, because the potatoes grow under the ground (in soil)."
    },

    {
        title: "Cabbage",
        description:
            "Colored Pencil | I like cabbage because their leaves are very, very big, and they taste good!​"
    },

    {
        title: "Freckles",
        description:
            "Watercolor | Referencing an online live model"
    },

    {
        title: "Green Beans (Young)",
        description:
            "Colored Pencil | Although they look small now, after a few weeks they can climb up the trellis pretty high."
    },

    {
        title: "Shamrock",
        description:
            "Colored Pencil | You may probably know this as "three-leave" clovers.\nBut it actually yields flowers. At my home backyard the flowers are purple, while at some other places other species of clovers could yield white flowers.\nActually they are not considered "lucky plants" in gardening. They are considered as weeds, who steal nutriets."
    },

    {
        title: "Water Spinach",
        description:
            "Colored Pencil | The leaves of them can grow really long."
    },

    {
        title: "Threads, Flowers, and Hair",
        description:
            "Embroidery | What forms do threads reveal to you? That’s all up to imagination."
    },

    {
        title: "Mint",
        description:
            "Colored Pencil | Here’s an interesting fact: rub a mint leaf, the juice produced can help cure mosquito bites.\nI took three months to complete this mint, from June, 2025 to September, 2025. During this period I was thinking about my life, and I have encountered many people throughout the summer attending summer camps and research programs. When I completed I looked at every leaf I draw. Then I thought, maybe that the leaves did not record the story of the mint, but also record the encounters of myself."
    },

    {
        title: "Green Beans (Blooming)",
        description:
            "Colored Pencil | Most people only notice the beans of this plants. But actually its flowers are the most intriguing part for me: they have a soft, shiny purple and are butterfly-shaped!"
    },

    {
        title: "Pepper",
        description:
            "Colored Pencil | The tips of pepper leaves are very pointed. Moreover, I like the tiny pepper fruit - they are like lanterns! These small lanterns will grow up and turn from green to red in summer."
    },

    {
        title: "Pomegranate, or “Shiliu” Flower",
        description:
            "Colored Pencil | Pomegranate flowers bloom along the rack outside our house every summer back home. The summer in 2025, I traveled around Los Angeles and one day I spotted the same pomegranate blossoms in a garden in LA. I took out my phone and snapped photos. A stranger woman standing nearby noticed me and smiled, "do you know its name?" "I don't know its English name, but in Chinese we call it shiliu". She repeatedly "shiliu". So what does a name carry? I thought It’s a very interesting question."
    },

    {
        title: "Flutters",
        description:
            "Flat Digital Impasto Painting | Referencing an online live model"
    },

    {
        title: "Loquat",
        description:
            "Colored Pencil | The leaves of loquat are thick and leathery. Actually when I was drawing this my mother comments that I didn't draw the leaves well. Yeah, maybe, the leaves of loquat had a very special texture."
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
                Math.max(20, wallWidth - width - 55) + 25;


            /*
               Random vertical position

               This is the important part:
               the entire 2400px wall is used.
            */

            y = Math.random() *
                Math.max(100, wallHeight - height - 55) + 25;


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

        highestZIndex++;

        art.style.zIndex = highestZIndex;

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
