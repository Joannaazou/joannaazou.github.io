/* =========================
   Floating Star Particles
   ========================= */

const starField = document.getElementById("star-field");

const starCount = window.innerWidth <= 700 ? 35 : 65;


for (let i = 0; i < starCount; i++) {

    const star = document.createElement("span");

    star.classList.add("star");


    /* Random size */

    const randomSize = Math.random();

    if (randomSize < 0.72) {

        star.classList.add("small");

    } else if (randomSize < 0.95) {

        star.classList.add("medium");

    } else {

        star.classList.add("large");

    }


    /* Random position */

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";


    /* Random movement */

    star.style.setProperty(
        "--move-x",
        (Math.random() * 80 - 40) + "px"
    );

    star.style.setProperty(
        "--move-y",
        (Math.random() * 80 - 40) + "px"
    );


    /* Random animation speed */

    star.style.setProperty(
        "--duration",
        (18 + Math.random() * 25) + "s"
    );

    star.style.setProperty(
        "--twinkle",
        (3 + Math.random() * 5) + "s"
    );


    /* Random animation delay */

    star.style.animationDelay =
        (-Math.random() * 30) + "s";


    starField.appendChild(star);

}

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
            "Digital | Custom Chinese typography design for manga on the Chuman platform — cover titles and logo lettering for manga series."
    },

    {
        title: "BiXia Pond",
        description:
            "Digital | Campus ID card sleeve design at Suzhou High School of Jiangsu Province.\n“BiXia” in Chinese means azure mist. The brown-scarred geese and the light-glazed lake are impressions from my daily walks."
    },

    {
        title: "Hollyhock (Alcea rosea)",
        description:
            "Colored Pencil | Also known as 'A Zhang of Red' in Suzhou. They signal the coming of the Mid-Autumn Festival, and their petals are large—like umbrellas."
    },

    {
        title: "Cucumbers (Young)",
        description:
            "Colored Pencil | Every summer in my home backyard, my grandma would set up trellises for the cucumbers to grow."
    },

    {
        title: "Untitled",
        description:
            "Pen | Creative line-art experiment."
    },

    {
        title: "Beetroot",
        description:
            "Colored Pencil | The leaves of beetroots are very curly."
    },

    {
        title: "Sweet Potato",
        description:
            "Colored Pencil | Unlike cucumbers, sweet potatoes creep along the ground because the potatoes grow underground, in soil."
    },

    {
        title: "Cabbage",
        description:
            "Colored Pencil | I like cabbage because its leaves are very, very big, and it tastes good!"
    },

    {
        title: "Freckles",
        description:
            "Watercolor | Referencing an online live model."
    },

    {
        title: "Green Beans (Young)",
        description:
            "Colored Pencil | Although they look small now, after a few weeks they can climb quite high up the trellis."
    },

    {
        title: "Shamrock",
        description:
            "Colored Pencil | You may know this as 'three-leaf clover.'\nBut it also yields flowers. In my backyard, the flowers are purple; elsewhere, other clover species can produce white flowers.\nThey are not considered 'lucky plants' in gardening. They are often treated as weeds that compete for nutrients."
    },

    {
        title: "Water Spinach",
        description:
            "Colored Pencil | Its leaves can grow really long."
    },

    {
        title: "Threads, Flowers, and Hair",
        description:
            "Embroidery | What forms do threads reveal to you? That is all up to imagination."
    },

    {
        title: "Mint",
        description:
            "Colored Pencil | Here is an interesting fact: rubbing a mint leaf releases juice that can help soothe mosquito bites.\nI took three months to complete this drawing, from June 2025 to September 2025. During this period, I thought about my life and encountered many people attending summer camps and research programs.When I completed it, I thought maybe the leaves did not only record the story of the mint, but also my own encounters."
    },

    {
        title: "Green Beans (Blooming)",
        description:
            "Colored Pencil | Most people only notice the beans of this plant. But its flowers are the most intriguing part to me: they are soft, shiny purple, and butterfly-shaped."
    },

    {
        title: "Pepper",
        description:
            "Colored Pencil | The tips of pepper leaves are very pointed. I also like the tiny pepper fruits—they look like lanterns. These small lanterns grow larger and turn from green to red in summer."
    },

    {
        title: "Pomegranate, or 'Shiliu' Flower",
        description:
            "Colored Pencil | Pomegranate flowers bloom along the rack outside our house every summer back home. In the summer of 2025, I traveled around Los Angeles and spotted the same blossoms in a garden. I took out my phone and snapped photos.\nA woman standing nearby noticed me and smiled: 'Do you know its name?' I said, 'I do not know its English name, but in Chinese we call it shiliu.' She repeated, 'Shiliu.'\nSo what does a name carry? I thought it was a very interesting question."
    },

    {
        title: "Flutters",
        description:
            "Flat digital impasto painting | Referencing an online live model."
    },

    {
        title: "Loquat",
        description:
            "Colored Pencil | Loquat leaves are thick and leathery. When I was drawing this, my mother commented that I had not drawn the leaves well. Maybe she was right—the leaves of loquat have a very particular texture."
    }

];


/* =========================
   Random artwork layout
   ========================= */

function arrangeArtworks() {

    const wallWidth = wall.clientWidth;

    const wallHeight = wall.clientHeight;

    const placed = [];


    artworks.forEach((art) => {

        const width = art.offsetWidth;

        const height = art.offsetHeight;

        let x;

        let y;

        let attempts = 0;

        let validPosition = false;


        while (!validPosition && attempts < 300) {

            x = Math.random() *
                Math.max(20, wallWidth - width - 55) + 25;

            y = Math.random() *
                Math.max(100, wallHeight - height - 55) + 25;

            validPosition = true;


            for (const other of placed) {

                const horizontalDistance =
                    Math.abs(x - other.x);

                const verticalDistance =
                    Math.abs(y - other.y);


                if (
                    horizontalDistance < 310 &&
                    verticalDistance < 285
                ) {

                    validPosition = false;

                    break;
                }

            }

            attempts++;

        }


        art.style.left = x + "px";

        art.style.top = y + "px";


        placed.push({
            x: x,
            y: y
        });

    });

}


/* =========================
   Arrange after images load
   ========================= */

window.addEventListener("load", () => {

    arrangeArtworks();

});


/* =========================
   Dragging and viewer
   ========================= */

artworks.forEach((art, index) => {

    let dragging = false;

    let moved = false;

    let startPointerX = 0;

    let startPointerY = 0;

    let startLeft = 0;

    let startTop = 0;


    art.addEventListener("pointerdown", (event) => {

        if (!event.isPrimary) return;

        dragging = true;

        moved = false;

        startPointerX = event.clientX;

        startPointerY = event.clientY;

        startLeft = art.offsetLeft;

        startTop = art.offsetTop;


        highestZIndex++;

        art.style.zIndex = highestZIndex;


        art.setPointerCapture(event.pointerId);

        art.classList.add("dragging");

        event.preventDefault();

    });


    art.addEventListener("pointermove", (event) => {

        if (!dragging) return;

        const dx = event.clientX - startPointerX;

        const dy = event.clientY - startPointerY;


        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {

            moved = true;

        }


        if (moved) {

            art.style.left = startLeft + dx + "px";

            art.style.top = startTop + dy + "px";

        }

    });


    art.addEventListener("pointerup", (event) => {

        if (!dragging) return;

        dragging = false;

        art.classList.remove("dragging");


        if (art.hasPointerCapture(event.pointerId)) {

            art.releasePointerCapture(event.pointerId);

        }

    });


    art.addEventListener("pointercancel", () => {

        dragging = false;

        art.classList.remove("dragging");

    });


    art.addEventListener("click", (event) => {

        if (moved) {

            event.preventDefault();

            return;

        }


        viewer.style.display = "flex";

        viewerImage.src = art.src;


        if (artworkInfo[index]) {

            title.textContent = artworkInfo[index].title;

            text.textContent = artworkInfo[index].description;

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
