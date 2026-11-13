export {};

const images: string[] = [
    "../MEDIA/carousel1.jpg",
    "../MEDIA/carousel2.jpg",
    "../MEDIA/carousel3.jpg",
    "../MEDIA/Midnight Magic.jpg"

];

const mainImage = document.getElementById("carousel-image") as HTMLImageElement;

if(!mainImage) throw new Error("Main image not found");

let currentIndex = 0;

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    mainImage.src = images[currentIndex];
}

setInterval(nextImage, 3000);



