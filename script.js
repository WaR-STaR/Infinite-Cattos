const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

let loaded = false;
let imgLoaded = 0;
let totalImage = 0;

// Unsplash API
const count = 30;
const apiKey = 'T04GqIvQCum1UUaTDWBwqrBoVY-D69Hk-C5l4e-8XfM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=cats`;

// Check if all images are loaded
function imageLoaded() {
    imgLoaded++;
    if(imgLoaded === totalImage){
        loaded = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on dom elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for links & photos and add to dom
function displayPhotos() {
    imgLoaded = 0;
    totalImage = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error
    }
}

// To check for scrolling near bottom of page
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && loaded) {
        loaded = false;
        getPhotos();
    }
});

// On load
getPhotos();