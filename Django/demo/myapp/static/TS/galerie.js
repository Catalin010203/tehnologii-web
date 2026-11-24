const images = [
    "/static/MEDIA/carousel1.jpg",
    "/static/MEDIA/carousel2.jpg",
    "/static/MEDIA/carousel3.jpg",
    "/static/MEDIA/Midnight Magic.jpg"
];
const mainImage = document.getElementById("carousel-image");
if (!mainImage)
    throw new Error("Main image not found");
let currentIndex = 0;
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    mainImage.src = images[currentIndex];
}
setInterval(nextImage, 3000);
export {};
