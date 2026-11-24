const uvtImages = [
    "../MEDIA/uvt1.jpg",
    "../MEDIA/uvt2.jpg",
    "../MEDIA/uvt3.jpg",
    "../MEDIA/uvt4.jpg"
];
const uvtImage = document.getElementById("uvt-image");
if (!uvtImage)
    throw new Error("UVT image not found");
let currentIndex = 0;
function nextUVTImage() {
    currentIndex = (currentIndex + 1) % uvtImages.length;
    uvtImage.src = uvtImages[currentIndex];
}
setInterval(nextUVTImage, 3000);
export {};
