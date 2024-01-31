document.addEventListener("DOMContentLoaded",function(){
    // generate bubbles //
    const bubbleContainer = document.createElement('div');
    bubbleContainer.classList.add('bubble-container');

    for (let i = 0; i < 5; i++) {
        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add("bubble",`bubble${i+1}`)
        bubbleContainer.appendChild(bubbleDiv);
    }
    document.querySelector('main').append(bubbleContainer);
    //------------------------------------//
    let container = document.createElement('div');
    container.id = "container";

    // Create Sidebar
    let sidebar = document.createElement('div');
    sidebar.id = 'sidebar';

    let thumbnailDiv = document.createElement('div');
    thumbnailDiv.classList.add("thumbnail-container");

    // Portfolio Owner Information
    let ownerPhoto = document.createElement('img');
    ownerPhoto.src = 'img/user.png'; // Replace with the actual path
    ownerPhoto.alt = 'Owner Photo';

    let ownerName = document.createElement('p');
    ownerName.className = "owner";
    ownerName.textContent = 'Khondoker Abid Hasan Tanvir';

    let ownerDesignation = document.createElement('p');
    ownerDesignation.className = "designation";
    ownerDesignation.textContent = 'Web Developer & SEO Exoert';

    thumbnailDiv.appendChild(ownerPhoto);
    thumbnailDiv.appendChild(ownerName);
    thumbnailDiv.appendChild(ownerDesignation);
    sidebar.appendChild(thumbnailDiv);

    // Menu Bar
    let menuBar = document.createElement('ul');
    menuBar.id = 'menu';

    let menuItems = [
        { text: 'Home', icon: 'fa-solid fa-house-chimney' },
        { text: 'About', icon: 'fa-regular fa-address-card' },
        { text: 'Services', icon: 'fa-brands fa-buffer' },
        { text: 'Portfolio', icon: 'fas fa-briefcase' },
        { text: 'Contact', icon: 'fas fa-envelope' }
    ];
    let arrayOfList = [];
    menuItems.forEach(function (itemData,index) {
        
        let menuItem = document.createElement('li');
        menuItem.id = itemData.text.toLowerCase();
        menuItem.innerHTML = `<i class="${itemData.icon}"></i> ${itemData.text}`;
        if (index === 0) {
            menuItem.classList.add('active');
        }
        arrayOfList.push(menuItem);
        // Add click event listener to each menu item
        menuItem.addEventListener('click', function() {
            // Check if the clicked menu item already has 'active' class
            if (!menuItem.classList.contains('active')) {
                // Remove 'active' class from all menu items
                arrayOfList.forEach(function(item) {
                    item.classList.remove('active');
                });
                // Add 'active' class to the clicked menu item
                menuItem.classList.add('active');
                let prevSection = document.querySelector("#main-container section");
                console.log(prevSection);
                handleMenuItemClicks(menuItem.id,prevSection);
                
            }
        });
        menuBar.appendChild(menuItem);
    });

    sidebar.appendChild(menuBar);
    container.appendChild(sidebar);
    document.querySelector('main').append(container);
    //-----------------------------------------------//
    // generate main container div for furthur use //
    const mainContainer = document.createElement('div');
    mainContainer.id='main-container';
    container.appendChild(mainContainer);
    //----------------------------------------------------//
    let menubar = document.createElement('span');
    menubar.classList.add('menuIcon');
    menubar.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    menubar.addEventListener('click', function(){
        // Assuming sidebar is a reference to your sidebar element
        if (sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
            sidebar.classList.add('hide');
            setTimeout(function() {
                sidebar.style.display = "none";
            }, 500); // 500 milliseconds = 0.5 second

            // Change the menu icon back to "fa-bars"
            menubar.innerHTML = `<i class="fa-solid fa-bars"></i>`;
        } else {
            sidebar.classList.remove('hide');
            sidebar.style.display = "block";
            sidebar.classList.add('show');

            // Change the menu icon to "fa-xmark"
            menubar.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        }
        menubar.classList.toggle('active');
    });

    document.querySelector('main').appendChild(menubar);
    //---------------------------------------------//
    createSlideshow();
});

//------------------------------------------//
// create slide show //
//--------------------------------------//
// Function to create the slideshow container
function createSlideshow() {
    // Array of slide data
    const slidesData = [
        {
            imageSrc: 'img/tt.png',
            caption: {
                title: 'Professional Web Designer & Developer',
                description: 'Meet a professional web designer and developer. With a passion for creating visually appealing and functional websites, our owner brings expertise to every project.',
                buttonText: 'Resume'
            }
        },
        {
            imageSrc: 'img/banner1.png',
            caption: {
                title: 'Web Design and Development',
                description: 'Explore our services in web design and development. We specialize in crafting modern and responsive websites that enhance user experience and meet your business goals.',
                buttonText: 'Discover More'
            }
        },
        {
            imageSrc: 'img/banner2.png',
            caption: {
                title: 'Professional SEO Expert',
                description: 'Boost your online presence with our professional SEO services. Our owner is an expert in search engine optimization, ensuring your website ranks high and attracts the right audience.',
                buttonText: 'Explore SEO'
            }
        }
    ];

    // Get the slideshow container element
    // Create slideshow container
    const slideshowContainer = document.createElement('section');
    slideshowContainer.classList.add('slideshow-container','appear');
    slideshowContainer.id = "section-home";

    let btnContainer = document.createElement('div')
    btnContainer.classList.add('btn-container');
    // Create previous button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.classList.add('prev-button');

    // Create next button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.classList.add('next-button');

    // Append buttons to slideshow container
    btnContainer.appendChild(prevButton);
    btnContainer.appendChild(nextButton);
    slideshowContainer.appendChild(btnContainer);

    const allSlides = document.createElement('div');
    allSlides.classList.add('all-slides');
    // Create and append slides to the container
    slidesData.forEach((slideData, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        const image = document.createElement('img');
        image.src = slideData.imageSrc;

        const caption = document.createElement('div');
        caption.classList.add('caption');

        const title = document.createElement('h1');
        title.textContent = slideData.caption.title;

        const description = document.createElement('p');
        description.textContent = slideData.caption.description;

        const button = document.createElement('button');
        button.textContent = slideData.caption.buttonText;

        // Append elements to the caption div
        caption.appendChild(title);
        caption.appendChild(description);
        caption.appendChild(button);

        // Append elements to the slide div
        // Check if index is odd
    if (index % 2 === 1) {
        slide.appendChild(image);
        slide.appendChild(caption);
    } else {
        slide.appendChild(caption);
        slide.appendChild(image);
    }

    // Append the slide to the slideshow container
    allSlides.appendChild(slide);
    slideshowContainer.appendChild(allSlides);
    });

    // Append the slideshow container to the body
    let mainContainer = document.getElementById('main-container');
    //mainContainer.innerHTML = "",
    mainContainer.appendChild(slideshowContainer);

    // Show the first slide
    let currentSlide = 0;
    showSlide(currentSlide);
    // Event listener for next button
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slidesData.length;
        showSlide(currentSlide);
    });
    
    // Event listener for previous button
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
        showSlide(currentSlide);
    });
}

// Function to show a specific slide
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        if (i === index) {
            if (!slide.classList.contains('show')) {
                slide.classList.add('show');
                slide.style.display = 'flex';
                slide.classList.remove('hide');
            }
        } else {
            if (slide.classList.contains('show')) {
                slide.classList.remove('show');
                slide.classList.add('hide');
                setTimeout(() => {
                    slide.style.display = 'none';
                },1000)
            }
        }
    });
}



// ----------------------------------------------------------//
// create about section and append to the main container id //
//-----------------------------------------------------------//
function createAboutContainer() {
    // Create main about container
    const aboutContainer = document.createElement('section');
    aboutContainer.classList.add('about-container','appear');
    aboutContainer.id = "section-about";

    // Create feature container
    const featureContainer = document.createElement('div');
    featureContainer.classList.add('feature-container');

    // Create image element
    const featureImage = document.createElement('img');
    featureImage.src = 'img/tanvir.jpg'; // Set the image path

    // Create div with h3 and button
    const featureText = document.createElement('div');
    featureText.className = 'feature-text';
    const featureTitle = document.createElement('h3');
    featureTitle.textContent = 'Interested in my services?';
    
    const featureButton = document.createElement('button');
    featureButton.textContent = 'Contact Me';

    // Append elements to feature container
    featureText.appendChild(featureTitle);
    featureText.appendChild(featureButton);
    featureContainer.appendChild(featureImage);
    featureContainer.appendChild(featureText);

    // Create about contents container
    const aboutContents = document.createElement('div');
    aboutContents.classList.add('about-contents');

    // Create h1, h3, and p tags for about contents
    const aboutTitle = document.createElement('h1');
    aboutTitle.textContent = 'About Us';

    const aboutSubtitle = document.createElement('h3');
    aboutSubtitle.textContent = 'Our Story';

    const aboutParagraph = document.createElement('p');
    aboutParagraph.textContent = 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with.';

    // Append elements to about contents container
    aboutContents.appendChild(aboutTitle);
    aboutContents.appendChild(aboutSubtitle);
    aboutContents.appendChild(aboutParagraph);

    // Append feature container and about contents to the main about container
    aboutContainer.appendChild(featureContainer);
    aboutContainer.appendChild(aboutContents);

    let mainContainer = document.getElementById('main-container');
    //mainContainer.innerHTML = "",
    mainContainer.appendChild(aboutContainer);
}
//-------------------------------------------------//
// get the previous section and clicked menu item, call function assigned to the item//
//---------------------------------------------------//
function handleMenuItemClicks(sectionID, previousSection) {
    let mainContainer = document.getElementById("main-container");
    // Check if the previous section has "appear" or "disappear" class
    if (previousSection.classList.contains("appear")) {
        previousSection.classList.remove("appear");
    }
    if (previousSection.classList.contains("disappear")) {
        previousSection.classList.remove("disappear");
    }

    // Add "disappear" class to the previous section
    previousSection.classList.add("disappear");
    // Remove the previous section from the main container after 0.4s
    setTimeout(function () {
        mainContainer.removeChild(previousSection);
            // Handle click actions based on the menu item id
            if (sectionID === "home") {
                createSlideshow();
            } else if (sectionID === "about") {
                createAboutContainer();
            }
    }, 500);

}