const galleryItems=document.querySelectorAll(".gallery-item img");

const lightbox=document.querySelector(".lightbox");

const lightboxImage=document.getElementById("lightboxImage");

const close=document.querySelector(".close");

const prev=document.getElementById("prevBtn");

const next=document.getElementById("nextBtn");

let currentIndex=0;

galleryItems.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        currentIndex=index;

        showImage();

    });

});

function showImage(){

    lightboxImage.onload = () => {
    lightbox.classList.add("show");
};

lightboxImage.src = images[currentIndex].src;

}

close.onclick=()=>{

    lightbox.style.display="none";

}

next.onclick=()=>{

    currentIndex=(currentIndex+1)%galleryItems.length;

    showImage();

}

prev.onclick=()=>{

    currentIndex--;

    if(currentIndex<0){

        currentIndex=galleryItems.length-1;

    }

    showImage();

}

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight") next.click();

    if(e.key==="ArrowLeft") prev.click();

    if(e.key==="Escape") close.click();

});