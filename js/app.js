document.addEventListener('DOMContentLoaded', async () => {
    const data = await getdata();
    generateMetaTags(data.metaTags);
    let container = document.querySelector('main');
    // typewriterWords 
    const loadingWords = ['The Best Web Developer. ','Loading...', 'The Best SEO Expert In Bangladesh. '];
    let loadingAnimationContainer = createLoadingAnimation(data['section-home'].ownerInfo.name, data.metaTags.keywords,loadingWords);
    container.append(loadingAnimationContainer);

    // Calculate the total duration based on the length of typewriter words
    const totalDuration = loadingWords.reduce((acc, word) => acc + word.length, 0) * 61.2;

    setTimeout(() => {
        loadingAnimationContainer.classList.add('active');
        setTimeout(()=>{
            loadingAnimationContainer.remove();
            getDataAndGenrateInitialElements();
        },300);
    }, totalDuration);
});

function createTwinklingStar() {
    const star = document.createElement('i');
    star.classList.add('fa-solid', 'fa-star', 'twinkling-star');
    star.style.left = `${Math.random() * 85}%`;
    star.style.top = `${Math.random() * 85}%`;
    document.querySelector('main').appendChild(star);

    setTimeout(() => {
        star.classList.remove('twinkling-star');
        star.classList.add('falling-star');
        setTimeout(() => {
            star.remove();
        }, 200);
    }, Math.random() * 5000 + 1000); // Remove star after random time between 1 to 6 seconds
}

function twinklingStars() {
    setInterval(createTwinklingStar, 1000); // Create a new star every 2 seconds
}

//--------------------------------------------------------------------//
function createLoadingAnimation(ownerName, keywords,typewriterWords) {
    const loadingContainer = document.createElement('div');
    loadingContainer.classList.add('loading-container');

    let loadingImg = document.createElement("img");
    loadingImg.src = "img/logo.png";
    loadingImg.title = ownerName;
    loadingImg.alt = keywords;
    loadingContainer.appendChild(loadingImg);

    const loadingText = document.createElement('div');
    loadingText.textContent = ownerName;
    loadingText.classList.add('loading-text');
    loadingContainer.appendChild(loadingText);

    const typewriterText = document.createElement('div');
    typewriterText.classList.add('typewriter-text');
    loadingContainer.appendChild(typewriterText);

    let charIndex = 0;
    let wordIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = typewriterWords[wordIndex];
        const currentText = typewriterText.textContent;

        if (charIndex < currentWord.length && !isDeleting) {
            typewriterText.textContent += currentWord.charAt(charIndex);
            charIndex++;
        } else if (charIndex >= 0 && isDeleting) {
            typewriterText.textContent = currentText.slice(0, -1);
            charIndex--;
        } else {
            isDeleting = !isDeleting;
            wordIndex = isDeleting ? (wordIndex + 1) % typewriterWords.length : wordIndex;
        }

        const speed = isDeleting ? 20 : 40;
        setTimeout(type, speed);
    }

    type();

    return loadingContainer;
}
//------------------------------------------------------//
// get data function that returns all the data //
async function getdata() {
  try {
    const response = await fetch('data/data.json');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}

//--------------------------------------------------//
function generateMetaTags(metaData) {
    const head = document.head;

    // Create and append standard meta tags
    const standardMetaTags = `
        <meta name="description" content="${metaData.description}">
        <meta name="keywords" content="${metaData.keywords}">
        <meta name="author" content="${metaData.author}">
    `;
    head.insertAdjacentHTML('beforeend', standardMetaTags);

    // Create and append Open Graph meta tags
    const openGraphMetaTags = `
        <meta property="og:title" content="${metaData.openGraph.title}">
        <meta property="og:description" content="${metaData.openGraph.description}">
        <meta property="og:image" content="${metaData.openGraph.image}">
        <meta property="og:url" content="${metaData.openGraph.url}">
        <meta property="og:type" content="${metaData.openGraph.type}">
    `;
    head.insertAdjacentHTML('beforeend', openGraphMetaTags);

    // Create and append Twitter Card meta tags
    const twitterCardMetaTags = `
        <meta name="twitter:card" content="${metaData.twitterCard.card}">
        <meta name="twitter:site" content="${metaData.twitterCard.site}">
        <meta name="twitter:title" content="${metaData.twitterCard.title}">
        <meta name="twitter:description" content="${metaData.twitterCard.description}">
        <meta name="twitter:image" content="${metaData.twitterCard.image}">
    `;
    head.insertAdjacentHTML('beforeend', twitterCardMetaTags);
}

//-------------------------------------------------//
const currentTime = new Date();
const currentHour = currentTime.getHours();

async function getDataAndGenrateInitialElements(){
    let alldata = await getdata(); //important................
    
    // generate sky container //
    const skyContainer = document.createElement('div');
    skyContainer.classList.add('sky-container');
    // Create sun or moon element
    if (currentHour >= 6 && currentHour < 18) {
        document.body.style.background = 'linear-gradient(-120deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
        document.body.style.backgroundSize = '400% 400%';

        const sun = document.createElement('div');
        sun.classList.add('sun');
        skyContainer.appendChild(sun);
        const canvas = document.createElement('canvas');
        canvas.id = 'canv';
        skyContainer.appendChild(canvas);
        const birdScript = document.createElement('script');
        birdScript.src = 'js/bird.js';
        document.body.appendChild(birdScript);
    } else {
        document.body.style.background = "linear-gradient(-120deg, #2C5364, #203A43, #0F2027, #141E30,#03071e)";
        document.body.style.backgroundSize = '400% 400%';

        const moon = document.createElement('div');
        moon.classList.add('moon');
        skyContainer.appendChild(moon);
        twinklingStars();
    }
    
    for (let i = 0; i < 5; i++) {
        const cloudDiv = document.createElement('div');
        cloudDiv.classList.add("cloud",`cloud${i+1}`)
        skyContainer.appendChild(cloudDiv);
    }
    document.body.append(skyContainer);
    //------------------------------------//
    let container = document.createElement('div');
    container.id = "container";

    // Create Sidebar
    let sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    if (currentHour >= 6 && currentHour < 18) {
        sidebar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
    }else{
        sidebar.style.boxShadow = '0 4px 30px rgba(255, 255, 255, 0.2)';
    }

    let thumbnailDiv = document.createElement('div');
    thumbnailDiv.classList.add("thumbnail-container");

    // Portfolio Owner Information
    let homeData = alldata['section-home'];
    let ownerPhoto = document.createElement('img');
    ownerPhoto.src = homeData["ownerInfo"].thumbnailURL !== "" ? homeData["ownerInfo"].thumbnailURL : 'img/logo.png';
    ownerPhoto.alt = homeData["ownerInfo"].name;

    let ownerName = document.createElement('p');
    ownerName.className = "owner";
    ownerName.textContent = homeData["ownerInfo"].name;
    ownerName.setAttribute("user",homeData["ownerInfo"].name);

    let ownerDesignation = document.createElement('p');
    ownerDesignation.className = "designation";
    ownerDesignation.textContent = homeData["ownerInfo"].designation;

    thumbnailDiv.appendChild(ownerPhoto);
    thumbnailDiv.appendChild(ownerName);
    thumbnailDiv.appendChild(ownerDesignation);

    // Social Media
    const socialMedia = document.createElement('div');
    socialMedia.classList.add('social-media');

    alldata['section-contact'].socialMedia.forEach(social => {
        const icon = document.createElement('span');
        icon.innerHTML = social.icon;

        const link = document.createElement('a');
        link.href = social.url;
        link.target = '_blank';
        link.setAttribute("name",social.mediaName);
        if (currentHour >= 6 && currentHour < 18) {
            link.style.color = '#5558ff';
        }else{
            link.style.color = '#F6FDC3';
        };
        link.appendChild(icon);

        socialMedia.appendChild(link);
    });
    thumbnailDiv.appendChild(socialMedia);
    sidebar.appendChild(thumbnailDiv);

    // Menu Bar
    let menuBar = document.createElement('ul');
    menuBar.id = 'menu';

    let menuItems = [
        { text: 'Home', icon: 'fa-solid fa-house-chimney' },
        { text: 'About', icon: 'fa-regular fa-address-card' },
        { text: 'Experience', icon: 'fa-solid fa-award' },
        { text: 'Skills', icon: 'fas fa-code' },
        { text: 'Portfolio', icon: 'fas fa-briefcase' },
        { text: 'Services', icon: 'fa-brands fa-buffer' },
        { text: 'Testimonials', icon: 'fa-solid fa-wand-magic-sparkles' },
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
                let dataForNextSection = alldata[`section-${menuItem.id}`];
                handleMenuItemClicks(menuItem.id,prevSection,dataForNextSection);
                
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
    if (currentHour < 6 || currentHour > 18) {
        mainContainer.classList.add('night');
    }
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

    createSlideshow(alldata["section-home"].slides);
    // createAboutContainer(alldata['section-about'].texts);
    // createServicesSection(alldata['section-services'].services);
    // createPortfolioSection(alldata['section-portfolio'].projects);
    // createContactSection(alldata['section-contact']);
    //createSkillsSection(alldata['section-skills']);
    //createEducationAndExperienceSection(alldata['section-experience']);
    //createTestimonialSection(alldata['section-testimonials']);
    // Call the function with a 2-second delay
    setTimeout(updateCopyrightYear, 800);

};

function createTestimonialSection(testimonials) {
    // Create container for testimonial section
    const testimonialContainer = document.createElement('section');
    testimonialContainer.classList.add('testimonial-section','appear');

    // Create section header
    const sectionHeader = document.createElement('div');
    sectionHeader.classList.add('section-header');

    // Add heading
    const heading = document.createElement('h2');
    heading.textContent = 'Testimonials';

    // Add subheading
    const subheading = document.createElement('p');
    subheading.textContent = 'What our clients are saying about us';

    // Append heading and subheading to section header
    sectionHeader.appendChild(heading);
    sectionHeader.appendChild(subheading);

    // Append section header to testimonial container
    testimonialContainer.appendChild(sectionHeader);

    // Create cards container
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('testimonial-cards-container');

    // Loop through each testimonial
    testimonials.forEach((testimonial, index) => {
        // Use setTimeout to append each card with a delay
        setTimeout(() => {
            // Create testimonial card
            const testimonialCard = document.createElement('div');
            testimonialCard.classList.add('testimonial-card');
            const testimonialCardHeader = document.createElement('div');
            testimonialCardHeader.classList.add("testimonial-card-header");

            const namePositionContainer = document.createElement('div');
            namePositionContainer.classList.add('name-position-container');
            // Create testimonial name
            const testimonialName = document.createElement('p');
            testimonialName.classList.add('testimonial-name');
            testimonialName.textContent = testimonial.name;

            // Create testimonial position
            const testimonialPosition = document.createElement('p');
            testimonialPosition.classList.add('testimonial-position');
            testimonialPosition.textContent = testimonial.position;

            namePositionContainer.appendChild(testimonialName);
            namePositionContainer.appendChild(testimonialPosition);
            testimonialCardHeader.appendChild(namePositionContainer);

            if (testimonial.image && testimonial.image !== "") {
                // Create testimonial image
                const testimonialImage = document.createElement('img');
                testimonialImage.alt = testimonial.name;
                testimonialImage.src = testimonial.image;
                testimonialCardHeader.appendChild(testimonialImage);
            } else {
                // If no image, create an initial-container with the initial of the name
                let initial = document.createElement('h2');
                initial.innerHTML = testimonial.name.charAt(0).toUpperCase();

                // Append initial container to the testimonial card
                testimonialCardHeader.appendChild(initial);
            }

            // Create testimonial content
            const testimonialContent = document.createElement('div');
            testimonialContent.classList.add('testimonial-content');

            // Create testimonial quote
            const testimonialQuote = document.createElement('p');
            testimonialQuote.classList.add('testimonial-quote');
            testimonialQuote.textContent = testimonial.quote;

            // Create testimonial rating
            const testimonialRating = document.createElement('div');
            testimonialRating.classList.add('testimonial-rating');
            testimonialRating.innerHTML = generateRatingStars(testimonial.rating);

            // Append elements to testimonial content
            testimonialContent.appendChild(testimonialQuote);
            testimonialContent.appendChild(testimonialRating);

            // Append image and content to testimonial card
            testimonialCard.appendChild(testimonialCardHeader);
            testimonialCard.appendChild(testimonialContent);

            // Append testimonial card to the cards container
            cardsContainer.appendChild(testimonialCard);
        }, index * 500); // 1000 milliseconds (1 second) delay for each testimonial
    });

    // Append cards container to the testimonial container
    testimonialContainer.appendChild(cardsContainer);

    document.getElementById('main-container').appendChild(testimonialContainer);
}


function generateRatingStars(rating) {
    const fullStars = Math.floor(rating); // Number of full stars

    // Create HTML for rating stars
    let starsHTML = '';

    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fa-solid fa-star full-star"></i>';
    }
    // Empty stars to make the total 5
    const emptyStars = 5 - Math.ceil(rating); // Calculate the number of empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="fa-solid fa-star empty-star"></i>';
    }

    return starsHTML;
}

//------------------------------------------//
// create Education section //
//--------------------------------------//
function createEducationAndExperienceSection(data) {
    // Create education section
    const educationExperienceSection = document.createElement('section');
    educationExperienceSection.id = 'section-educationExperience';
    educationExperienceSection.classList.add('edu&exp-section','appear')

    // Create education container
    const educationContainer = document.createElement('div');
    educationContainer.classList.add('education-container');

    const educationHeader = document.createElement('div');
    educationHeader.classList.add('education-header');
    const educationHeading = document.createElement('h1');
    educationHeading.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${data['data-education'].heading}`;
    educationHeader.appendChild(educationHeading);
    educationContainer.appendChild(educationHeader);

    const educationCardContainer = document.createElement('div');
    educationCardContainer.classList.add('education-card-container');
    // Sort the experience entries based on their start dates
    data['data-education'].education.sort((a, b) => {
        const graduationYearA = new Date(a.graduationYear);
        const graduationYearB = new Date(b.graduationYear);
        return graduationYearB - graduationYearA;
    });
    // Loop through each education entry
    data['data-education'].education.forEach(educationEntry => {
        // Create education card
        const educationCard = document.createElement('div');
        educationCard.classList.add('education-card');

        // Create card header
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('edu-card-header');
        cardHeader.setAttribute('year', educationEntry.graduationYear);

        // Create degree element (h1)
        const degreeElement = document.createElement('h1');
        degreeElement.textContent = educationEntry.degree;

        // Create graduation year element (span)
        const graduationYearElement = document.createElement('span');
        graduationYearElement.textContent = educationEntry.graduationYear;

        // Append elements to card header
        cardHeader.appendChild(degreeElement);
        cardHeader.appendChild(graduationYearElement);

        // Create card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('edu-card-body');
        
        const eduDetails = document.createElement('div');
        eduDetails.classList.add("edu-details");
        const detailDivHeading = document.createElement('h3');
        detailDivHeading.innerHTML = `<strong>Details:</strong>`;
        eduDetails.appendChild(detailDivHeading);
        // Create university element
        const universityElement = document.createElement('p');
        universityElement.innerHTML = `<strong><i class="fa-solid fa-building-columns"></i> University:</strong> ${educationEntry.university}`;
        // Create university element
        const subjectElement = document.createElement('p');
        subjectElement.innerHTML = `<strong><i class="fa-solid fa-book-open"></i> Subject:</strong> ${educationEntry.subject}`;
        // Create university element
        const passedElement = document.createElement('p');
        passedElement.innerHTML = `<strong><i class="fa-regular fa-calendar-days"></i> Passed On:</strong> ${educationEntry.graduationYear}`;

        // Create location element
        const locationElement = document.createElement('p');
        locationElement.innerHTML = `<strong><i class="fa-solid fa-earth-asia"></i> Location:</strong> ${educationEntry.location}`;

        // Append elements to card body
        eduDetails.appendChild(universityElement);
        eduDetails.appendChild(subjectElement);
        eduDetails.appendChild(passedElement);
        eduDetails.appendChild(locationElement);
        cardBody.appendChild(eduDetails);

        // Check if "activity" property exists
        if (educationEntry.activity && educationEntry.activity.length > 0) {
            // Create activity container div
            const activityContainer = document.createElement('div');
            activityContainer.classList.add('activity-container');
            const activityHeading = document.createElement('h3');
            activityHeading.innerHTML = `<strong>Extra Curricular Activities:</strong>`;
            activityContainer.appendChild(activityHeading);
            // Loop through activities and create paragraphs
            educationEntry.activity.forEach(activity => {
                const activityElement = document.createElement('p');
                activityElement.innerHTML = `<b><i class="fa-solid fa-check"></i></b> ${activity}`;
                activityContainer.appendChild(activityElement);
            });

            // Append activity container to card body
            cardBody.appendChild(activityContainer);
            cardBody.classList.add('two-column');
        }
        // Append card header and body to the education card
        educationCard.appendChild(cardHeader);
        educationCard.appendChild(cardBody);

        // Append education card to the education container
        educationCardContainer.appendChild(educationCard);
    });

    // Append education container to the education section
    educationContainer.appendChild(educationCardContainer);
    educationExperienceSection.appendChild(educationContainer);
//---------------------------------------------------------------------//
    // Create experience container
    const experienceContainer = document.createElement('div');
    experienceContainer.classList.add('experience-container');

    const experienceHeader = document.createElement('div');
    experienceHeader.classList.add('experience-header');
    const experienceHeading = document.createElement('h1');
    experienceHeading.innerHTML = `<i class="fa-solid fa-chart-line"></i> ${data['data-experience'].heading}`;
    experienceHeader.appendChild(experienceHeading);
    experienceContainer.appendChild(experienceHeader);

    const experienceCardContainer = document.createElement('div');
    experienceCardContainer.classList.add('experience-card-container');

    data['data-experience'].experience.sort((a, b) => {
        const startDateA = new Date(a.startDate);
        const startDateB = new Date(b.startDate);
        return startDateB - startDateA;
    });
    // Loop through each experience entry
    data['data-experience'].experience.forEach(experienceEntry => {
        // Create experience card
        const experienceCard = document.createElement('div');
        experienceCard.classList.add('experience-card');

        // Create card header
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('exp-card-header');
        const startDate = new Date(experienceEntry.startDate);
        cardHeader.setAttribute('year', startDate.getFullYear().toString());

        // Create position element (h1)
        const positionElement = document.createElement('h1');
        positionElement.textContent = experienceEntry.position;

        // Create graduation year element (span)
        const startYearElement = document.createElement('span');
        startYearElement.textContent = `Started: ${experienceEntry.startDate}`;

        // Append elements to card header
        cardHeader.appendChild(positionElement);
        cardHeader.appendChild(startYearElement);

        // Create card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('exp-card-body');

        const expDetails = document.createElement('div');
        expDetails.classList.add("exp-details");
        const detailDivHeading = document.createElement('h3');
        detailDivHeading.innerHTML = `<strong>Details</strong>`;
        expDetails.appendChild(detailDivHeading);
        // Create company element (p)
        const companyElement = document.createElement('p');
        companyElement.innerHTML = `<strong><i class="fa-regular fa-building"></i> Company:</strong> ${experienceEntry.company}`;
        // Create start date element (p)
        const startDateElement = document.createElement('p');
        startDateElement.innerHTML = `<strong><i class="fa-regular fa-circle-play"></i> Started On:</strong> ${experienceEntry.startDate}`;
        // Create end date element (p)
        const endDateElement = document.createElement('p');
        endDateElement.innerHTML = `<strong><i class="fa-solid fa-hourglass-end"></i> Ended On:</strong> ${experienceEntry.endDate}`;

        // Create location element
        const locationElement = document.createElement('p');
        locationElement.innerHTML = `<strong><i class="fa-solid fa-map-location"></i> Location:</strong> ${experienceEntry.location}`;
        // Append elements to card body
        expDetails.appendChild(companyElement);
        expDetails.appendChild(startDateElement);
        expDetails.appendChild(endDateElement);
        expDetails.appendChild(locationElement);
        cardBody.appendChild(expDetails);
        // Create responsibilities element
        // Check if "activity" property exists
        if (experienceEntry.responsibilities && experienceEntry.responsibilities.length > 0) {
            // Create activity container div
            const responsibilityContainer = document.createElement('div');
            responsibilityContainer.classList.add('responsibility-container');
            const responsibilityHeading = document.createElement('h3');
            responsibilityHeading.innerHTML = `<strong>Responsibilities</strong>`;
            responsibilityContainer.appendChild(responsibilityHeading);
            // Loop through activities and create paragraphs
            experienceEntry.responsibilities.forEach(responsibility => {
                const responsibilityElement = document.createElement('p');
                responsibilityElement.innerHTML = `<b><i class="fa-solid fa-check"></i></b> ${responsibility}`;
                responsibilityContainer.appendChild(responsibilityElement);
            });

            // Append activity container to card body
            cardBody.appendChild(responsibilityContainer);
            cardBody.classList.add('two-column');
        }

        // Append card header and body to the experience card
        experienceCard.appendChild(cardHeader);
        experienceCard.appendChild(cardBody);

        // Append experience card to the experience container
        experienceCardContainer.appendChild(experienceCard);
    });

    // Append experience container to the experience section
    experienceContainer.appendChild(experienceCardContainer);
    educationExperienceSection.appendChild(experienceContainer);

    // Append both education and experience sections to the main container or body
    document.getElementById('main-container').appendChild(educationExperienceSection);
}


//------------------------------------------//
// create slide show //
//--------------------------------------//
// Function to create the slideshow container
function createSlideshow(slidesData) {
    // Get the slideshow container element
    // Create slideshow container
    const slideshowContainer = document.createElement('section');
    slideshowContainer.classList.add('slideshow-container');
    slideshowContainer.id = "section-home";
    // slideshowContainer.style.height = (window.innerHeight-50)+'px';

    let btnContainer = document.createElement('div')
    btnContainer.classList.add('btn-container');
    // Create previous button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.classList.add('prev-button');

    // Create play button
    const playButton = document.createElement('button');
    // playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playButton.classList.add('play-button');

    // Create next button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.classList.add('next-button');

    // Append buttons to slideshow container
    btnContainer.appendChild(prevButton);
    btnContainer.appendChild(playButton);
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

        // Append elements to the caption div
        caption.appendChild(title);
        caption.appendChild(description);

        if(slideData.caption.buttonText){
            const button = document.createElement('button');
            if(index == 0){
                button.innerHTML = `<i class="fa-solid fa-paperclip"></i> ${slideData.caption.buttonText}`;
            }else{
                button.textContent = slideData.caption.buttonText;
            }
            button.addEventListener('click', function() {
                if (slideData.caption.buttonURL && index == 0) {
                    displaySingleFile('My Resume',slideData.caption.buttonURL);
                }
            });
            caption.appendChild(button);
        }

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

    // Set auto slide interval (in milliseconds)
    let autoSlideInterval;
    // Variable to track auto slide status
    let autoSlidePlaying = true;

    // Function to start auto slide
    function startAutoSlide() {
        let count = 5;
        playButton.innerHTML = count;
    
        autoSlideInterval = setInterval(() => {
            count--;
            if (count > 0) {
                playButton.innerHTML = `<span class="counting">${count}</span>`;
            } else {
                playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
                clearInterval(autoSlideInterval);
                currentSlide = (currentSlide + 1) % slidesData.length;
                showSlide(currentSlide);
                startAutoSlide(); // Restart the countdown
            }
        }, 3000);
    }
    // Start auto slide initially
    startAutoSlide();
    // Event listener for next button
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slidesData.length;
        showSlide(currentSlide);
    });
    // Event listener for play button
    playButton.addEventListener('click', function() {
        autoSlidePlaying = !autoSlidePlaying;
        if (!autoSlidePlaying) {
            // If auto slide is active, pause it
            pauseAutoSlide();
            playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        } else {
            // If auto slide is paused, start it
            startAutoSlide();
            playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
    });

   // Function to pause auto slide
   function pauseAutoSlide() {
        clearInterval(autoSlideInterval);
    }
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


function displaySingleFile(headingText,filePathOrURL) {
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content','popup');

    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    const modalTitle = document.createElement("h2");
    modalTitle.textContent = headingText;
    modalHeader.appendChild(modalTitle);

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeButton.addEventListener('click', function() {
        modalContainer.remove();
    });
    modalHeader.appendChild(closeButton);

    // Create modal body
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');

    if (filePathOrURL.startsWith('http') || filePathOrURL.startsWith('www')) {
        // If it's a URL, use an iframe
        const pdfIframe = document.createElement('iframe');
        pdfIframe.src = filePathOrURL;
        pdfIframe.width = '100%';
        pdfIframe.height = '500px';
        pdfIframe.allow = 'autoplay';
        modalBody.appendChild(pdfIframe);
    } else {
        // If it's a local file path, use an object tag
        const pdfObject = document.createElement('object');
        pdfObject.type = 'application/pdf';
        pdfObject.data = filePathOrURL;
        pdfObject.width = '100%';
        pdfObject.height = '500px';
        modalBody.appendChild(pdfObject);
    }

    // Create modal footer
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');

    // Append header, body, and footer to modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    // Append modal content to modal container
    modalContainer.appendChild(modalContent);

    // Append modal container to body
    document.body.appendChild(modalContainer);
}

// ----------------------------------------------------------//
// create about section and append to the main container id //
//-----------------------------------------------------------//
function createAboutContainer(paragraphs) {
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
    aboutTitle.textContent = 'About Me';

    const aboutSubtitle = document.createElement('h3');
    aboutSubtitle.textContent = 'My Story';

    const aboutParaContainer = document.createElement('div');
    aboutParaContainer.className = 'about-texts';
    paragraphs.forEach(para => {
        const aboutParagraph = document.createElement('p');
        aboutParagraph.innerHTML = para;
        aboutParaContainer.appendChild(aboutParagraph);
    })

    // Append elements to about contents container
    aboutContents.appendChild(aboutTitle);
    aboutContents.appendChild(aboutSubtitle);
    aboutContents.appendChild(aboutParaContainer);

    // Append feature container and about contents to the main about container
    aboutContainer.appendChild(featureContainer);
    aboutContainer.appendChild(aboutContents);

    let mainContainer = document.getElementById('main-container');
    //mainContainer.innerHTML = "",
    mainContainer.appendChild(aboutContainer);
}
//------------------------------------------//
// create Service section //
//--------------------------------------//
function createServicesSection(servicesArray) {
    // Create services section
    const servicesSection = document.createElement('section');
    servicesSection.classList.add("servies","appear");
    servicesSection.id = 'section-services';

    const serviceHeader = document.createElement('h1');
    serviceHeader.innerHTML = '<i class="fa-solid fa-screwdriver-wrench"></i> Services';
    servicesSection.appendChild(serviceHeader);
    // Create container for services
    const servicesContainer = document.createElement('div');
    servicesContainer.classList.add('services-container');

    // Loop through each service object in the array
    servicesArray.forEach((serviceData,index) => {
        // Create service div
        const serviceDiv = document.createElement('div');
        serviceDiv.classList.add('service');

        // Create service icon element
        let classArray = ["spin","swing","search","flip","heart-beat",'bounce'];
        const serviceIcon = document.createElement('span');
        serviceIcon.innerHTML= `<i class="${serviceData.icon} ${classArray[index]}"></i>`;
        //serviceIcon.classList.add(classArray[index]);

        // Create service name element
        const serviceName = document.createElement('h2');
        serviceName.textContent = serviceData.name;

        // Create service tagline element
        const serviceTagline = document.createElement('p');
        serviceTagline.classList.add('tagline');
        serviceTagline.textContent = serviceData.tagLine;

        // Create service synopsis element
        const serviceSynopsis = document.createElement('p');
        serviceSynopsis.classList.add('synopsis');
        serviceSynopsis.textContent = serviceData.synopsis;

        // Create service button element
        const serviceButton = document.createElement('button');
        serviceButton.textContent = serviceData.buttonText;
        serviceButton.addEventListener('click', function(){
            displayProject(serviceData);
        });

        // Append elements to the service div
        serviceDiv.appendChild(serviceIcon);
        serviceDiv.appendChild(serviceName);
        serviceDiv.appendChild(serviceTagline);
        serviceDiv.appendChild(serviceSynopsis);
        serviceDiv.appendChild(serviceButton);

        // Append service div to the services container
        servicesContainer.appendChild(serviceDiv);
    });

    // Append services container to the services section
    servicesSection.appendChild(servicesContainer);

    // Append the services section to the main container
    document.getElementById('main-container').appendChild(servicesSection);
}

//------------------------------------------//
// create skills section //
//--------------------------------------//
function createSkillsSection(skillData) {
    // Create skills section
    const skillsSection = document.createElement('section');
    skillsSection.classList.add('skill-section','appear');
    skillsSection.id = 'section-skills';

    // Heading
    const heading = document.createElement('h1');
    heading.innerHTML = `<i class="fa-solid fa-screwdriver-wrench"></i> ${skillData.heading}`;

    // Append heading to the skills section
    skillsSection.appendChild(heading);

    const skillGroupContainer = document.createElement('div');
    skillGroupContainer.classList.add('skill-group-container');

    // Loop through each skill category
    skillData.skills.forEach(skillCategory => {
        // Create skill group div
        const skillGroupDiv = document.createElement('div');
        skillGroupDiv.classList.add('skill-group');

        // Create skill category heading
        const skillCategoryHeading = document.createElement('h3');
        skillCategoryHeading.textContent = skillCategory.category;
        // Append skill category heading to skill group div
        skillGroupDiv.appendChild(skillCategoryHeading);

        // Loop through each skill in the category
        skillCategory.items.forEach(skill => {
            // Create skill div
            const skillDiv = document.createElement('div');
            skillDiv.classList.add('skill');

            // Create skill name paragraph
            const skillName = document.createElement('p');
            skillName.textContent = skill.name;

            // Create skill bar div
            const skillBarDiv = document.createElement('div');
            skillBarDiv.classList.add('bar');

            // Create skill level bar div
            const skillLevelBarDiv = document.createElement('div');
            skillLevelBarDiv.classList.add('skill-bar');

            // Create skill level span with data-level attribute
            const skillLevelSpan = document.createElement('span');
            skillLevelSpan.classList.add('skill-level');
            skillLevelSpan.setAttribute('data-level', skill.level);
            
            
            // Set initial width to 0
            skillLevelBarDiv.style.width = '0';
            
            // Use setInterval to gradually increase the width
            let currentWidth = 0;
            const targetWidth = skill.level; // Set the target width based on the skill level
            
            const intervalId = setInterval(() => {
                currentWidth++;
            
                // Update the width of the skill bar
                skillLevelBarDiv.style.width = `${currentWidth}%`;
                skillLevelSpan.textContent = `${currentWidth}%`;
            
                // Check if the target width is reached
                if (currentWidth >= targetWidth) {
                    clearInterval(intervalId); // Stop the interval
                }
            }, 30); // Adjust the interval duration as needed (lower value for faster increase)

            // Append skill level span to skill level bar div
            skillLevelBarDiv.appendChild(skillLevelSpan);

            // Append skill level bar div to skill bar div
            skillBarDiv.appendChild(skillLevelBarDiv);

            // Append skill name and skill bar div to skill div
            skillDiv.appendChild(skillName);
            skillDiv.appendChild(skillBarDiv);

            // Append skill div to skill group div
            skillGroupDiv.appendChild(skillDiv);
            skillGroupContainer.appendChild(skillGroupDiv);
        });
    });
    // Append skill group div to the skills section
    skillsSection.appendChild(skillGroupContainer);
    // Append the skills section to the main container
    document.getElementById('main-container').appendChild(skillsSection);
}
//------------------------------------------//
// create Portfolio section //
//--------------------------------------//
function createPortfolioSection(projects) {
    // Create portfolio section
    const portfolioSection = document.createElement('section');
    portfolioSection.classList.add('portfolio-container','appear');
    portfolioSection.id = 'section-portfolio';

    // Create tabs container
    const tabsContainer = document.createElement('div');
    tabsContainer.classList.add('tabs-container');

    // Create tabs
    const tabs = ['All'];

    // Populate uniqueCategories array with categories from projects
    projects.forEach(project => {
        if (!tabs.includes(project.category)) {
            tabs.push(project.category);
        }
    });

    let arrayOfTabs =[];

    tabs.forEach((tabName,index) => {
        const tab = document.createElement('div');
        // Extract the last word from tabName if it contains multiple words
        if(window.innerWidth <= 768){
            const lastWord = tabName.split(/\s+/).pop();
            tab.textContent = lastWord ? lastWord : tabName;
        }else{
            tab.textContent =  tabName;
        }
        tab.classList.add('tab');
        if(index == 0){tab.classList.add('active');}
        tabsContainer.appendChild(tab);
        arrayOfTabs.push(tab);

        // Add click event listener to filter projects based on the tab
        tab.addEventListener('click', () => {
            // Remove 'active' class from all tabs
            arrayOfTabs.forEach(tab => {
                tab.classList.remove('active');
            });

            // Add 'active' class to the clicked tab
            tab.classList.add('active');

            // Filter projects based on the tab
            filterProjects(tabName.toLowerCase());
        });
    });


    // Append tabs container to the portfolio section
    portfolioSection.appendChild(tabsContainer);

    // Create projects container
    const projectsContainer = document.createElement('div');
    projectsContainer.classList.add('projects-container');

    // Function to filter projects based on the selected category
    function filterProjects(category) {
        const filteredProjects = (category === 'all') ?
            projects :
            projects.filter(project => project.category.toLowerCase() === category.toLowerCase());

        // Clear existing projects
        projectsContainer.innerHTML = '';

        // Check if filteredProjects is empty or has length 0
        if (filteredProjects.length == 0) {
            projectsContainer.innerHTML = `<div class="card emptyMsg"><h2>Projects has not been uploaded yet.</h2></div>`;
            return; // Exit the function
        }

        // Create project cards with delayed appearance
        filteredProjects.forEach((project, index) => {
            setTimeout(() => {
                createProjectCard(project);
            }, index * 200); // Adjust delay time as needed (200ms delay between each card)
        });
    }

    // Create project card
    function createProjectCard(project) {
        // Create card element
        const card = document.createElement('div');
        card.classList.add('card');

        // Create card header
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

        // Image in the card header
        const image = document.createElement('img');
        image.src = project.imageSrc;
        cardHeader.appendChild(image);
        // language and ttag contianer
        const langAndTagContainer = document.createElement('div');
        langAndTagContainer.classList.add('lang-and-tag-container');
        // Languages in the card header
        if(project.language){
            const languages = document.createElement('div');
            languages.classList.add('languages');
            Object.entries(project.language).forEach(([lang, percentage]) => {
                const spanLang = document.createElement('span');
                spanLang.textContent = `${lang} ${percentage}%`;
                if(percentage <= 20){
                    spanLang.style.fontSize = '7px';
                }
                spanLang.setAttribute('value',`${percentage}%`);
                spanLang.style.width = `${percentage}%`;
                languages.appendChild(spanLang);
            });
            langAndTagContainer.appendChild(languages);
        }
        // Tags in the card body
        const tags = document.createElement('p');
        tags.classList.add('tags');
        project.tags.forEach(tag => {
            const spanTag = document.createElement('span');
            spanTag.textContent = tag;
            tags.appendChild(spanTag);
        });
        langAndTagContainer.appendChild(tags);
        cardHeader.appendChild(langAndTagContainer);
        // Create card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Title in the card body
        const title = document.createElement('h3');
        title.textContent = project.title;

        // Description in the card body
        const descriptionContainer = document.createElement("div");
        descriptionContainer.className = "description-container";

        const description = document.createElement('p');
        description.textContent = project.description;
        descriptionContainer.appendChild(description);

        cardBody.appendChild(title);
        cardBody.appendChild(descriptionContainer);

        // Create card footer
        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer');

        // View Project button in the card footer
        const viewProjectBtn = document.createElement('button');
        viewProjectBtn.type = 'button';
        viewProjectBtn.textContent = 'View Project';

        // Add event listener to the button
        viewProjectBtn.addEventListener('click', () => {
            displayProject(project);
        });

        cardFooter.appendChild(viewProjectBtn);

        // Append card elements to the card
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        // Append card to the projects container
        projectsContainer.appendChild(card);
    }

    // Initial display: Show all projects
    filterProjects('all');

    // Append projects container to the portfolio section
    portfolioSection.appendChild(projectsContainer);

    // Append the portfolio section to the main container
    document.getElementById('main-container').appendChild(portfolioSection);
}

function displayProject(projectData) {
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    if (currentHour >= 6 || currentHour < 18) {
        modalContent.classList.add('night');
    }
    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    // Header content based on data type
    let headerContent;

    if (projectData.hasOwnProperty('title')) {
        // Portfolio data
        headerContent = `<h2>${projectData.title}</h2>`;
    } else if (projectData.hasOwnProperty('name')) {
        // Service data
        headerContent = `<h2>${projectData.name}</h2>`;
    }

    // Project name or service name in the header
    const projectName = document.createElement('div');
    projectName.className = "title-container";
    projectName.innerHTML = headerContent;

    // Close button in the header
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeButton.addEventListener('click', () => {
        // Close the modal when the close button is clicked
        if(modalContent.classList.contains("popup")){
            modalContent.classList.remove("popup");
        }
        modalContent.classList.add('popOut');
        setTimeout(() => {
            modalContainer.remove();
        },500)
    });

    // Append elements to the modal header
    modalHeader.appendChild(projectName);
    modalHeader.appendChild(closeButton);

    // Create modal body
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');

    // Body content based on data type
    let bodyContent;

    if (projectData.hasOwnProperty('projectURL')) {
        // Portfolio data
        if (typeof projectData.projectURL === "string") {
            const iframe = document.createElement('iframe');
            iframe.src = projectData.projectURL;
            iframe.style.width = '100%';
            iframe.style.height = '70vh';
            bodyContent = iframe;
        } else if (typeof projectData.projectURL === "object") {
            // Create lightbox container
            const lightboxContainer = document.createElement('div');
            lightboxContainer.classList.add('lightbox-container');

            // Create lightbox display section
            const lightboxDisplay = document.createElement('div');
            lightboxDisplay.classList.add('lightbox-display');

            // Create img tag for lightbox display
            const displayImage = document.createElement('img');
            displayImage.src = projectData.projectURL[0]; // Assuming the first URL
            lightboxDisplay.appendChild(displayImage);

            // Create lightbox thumbnails section
            const lightboxThumbnails = document.createElement('div');
            lightboxThumbnails.classList.add('lightbox-thumbnails');

            // Create img tags for all URLs in thumbnails
            projectData.projectURL.forEach((url,index) => {
                const thumbnailImage = document.createElement('img');
                thumbnailImage.src = url;
                if(index == 0){
                    thumbnailImage.classList.add('active');
                }
                // Add click event to set display image on thumbnail click
                thumbnailImage.addEventListener('click', function() {
                    // Remove active class from previously clicked thumbnail
                    const activeThumbnail = document.querySelector('.lightbox-thumbnails img.active');
                    if (activeThumbnail) {
                        activeThumbnail.classList.remove('active');
                    }
                
                    // Set source for displayImage
                    displayImage.src = url;
                
                    // Add active class to the clicked thumbnail
                    thumbnailImage.classList.add('active');
                });
                
                lightboxThumbnails.appendChild(thumbnailImage);
            });

            // Append display and thumbnails to lightbox container
            lightboxContainer.appendChild(lightboxDisplay);
            lightboxContainer.appendChild(lightboxThumbnails);

            bodyContent = lightboxContainer;
        }
    } else if (projectData.hasOwnProperty('plans')) {
        // Service data
        bodyContent = createServicePlansHTML(projectData.plans, projectName,modalBody, projectData.article);
        modalContent.classList.add('plan-modal');
    }

    // Append elements to the modal body
    modalBody.appendChild(bodyContent);

    // Append header and body to the modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    // Append modal content to the modal container
    modalContainer.appendChild(modalContent);

    // Append the modal container to the body
    document.body.appendChild(modalContainer);
    modalContent.classList.add("popup");
}

function createServicePlansHTML(plans, headerDiv, bodyDiv, article) {
    // Create container for service plans
    const serviceDetailsContainer = document.createElement('div');
    serviceDetailsContainer.classList.add('service-details-container');

    if(article){
            // Create service article container
            const serviceArticleContainer = document.createElement('div');
            serviceArticleContainer.classList.add('service-article-container');
            // Create service article content
            const serviceArticleContent = document.createElement('div');
            serviceArticleContent.classList.add('service-article-content');
            serviceArticleContent.innerHTML = article;
            // Append article content to service article container
            serviceArticleContainer.appendChild(serviceArticleContent);
            // Append service article container to service details container
            serviceDetailsContainer.appendChild(serviceArticleContainer);
    }

    // Create container for service plans
    const plansContainer = document.createElement('div');
    plansContainer.classList.add('plan-columns', `column${Object.entries(plans).length}`);

    // Loop through each plan
    for (const [planName, planDetails] of Object.entries(plans)) {
        const newPlanDetails = {
            planName: planName,
            ...planDetails  // Copy the existing properties
        };
        // Create plan card
        const planCard = document.createElement('div');
        planCard.classList.add('plan-card');

        // Create plan header
        const planHeader = document.createElement('div');
        planHeader.classList.add('plan-header');

        // Create plan name element (h3)
        const planNameElement = document.createElement('h3');
        planNameElement.textContent = planName;

        // Create plan price element (p)
        const planPriceElement = document.createElement('p');
        planPriceElement.textContent = `Price: ${planDetails.price}`;

        // Append name and price elements to plan header
        planHeader.appendChild(planNameElement);
        planHeader.appendChild(planPriceElement);

        // Create plan body
        const planBody = document.createElement('div');
        planBody.classList.add('plan-body');

        // Create plan features element (ul)
        const planFeaturesElement = document.createElement('ul');

        // Loop through features and create list items
        for (const feature of planDetails.features) {
            const featureItem = document.createElement('li');
            featureItem.textContent = feature;
            planFeaturesElement.appendChild(featureItem);
        }

        // Append features to plan body
        planBody.appendChild(planFeaturesElement);

        // Create plan footer
        const planFooter = document.createElement('div');
        planFooter.classList.add('plan-footer');

        // Create Buy Now button
        const planBtn = document.createElement("button");
        planBtn.type = "button";
        planBtn.id = planDetails.planID;
        planBtn.textContent = "Buy Now";

        // Create a "Back" button
        const backButton = document.createElement('span');
        backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
        backButton.classList.add('back-button');

        planBtn.addEventListener('click', () => {
            headerDiv.insertBefore(backButton, headerDiv.firstChild);
            plansContainer.innerHTML = '';

            // Display the selected plan details
            const selectedPlanDetailsContainer = document.createElement('div');
            selectedPlanDetailsContainer.className = "selected-plan-details";

            for (const [key, value] of Object.entries(newPlanDetails)) {
                // Create a paragraph element for each key-value pair
                const detailItem = document.createElement('p');
                detailItem.textContent = `${key}: ${value}`;

                // Append the paragraph element to the selectedPlanDetailsContainer
                selectedPlanDetailsContainer.appendChild(detailItem);
            }

            // Append the selectedPlanDetailsContainer to plansContainer
            plansContainer.appendChild(selectedPlanDetailsContainer);

            let serviceContactForm = createContactForm();
            serviceContactForm.id = "service-form";

            // Create a container for the service form
            const serviceFormContainer = document.createElement('div');
            serviceFormContainer.classList.add('service-form-container');

            // Create a heading for the form
            const formHeading = document.createElement('h3');
            formHeading.textContent = 'Tell me about your project';

            // Create a paragraph
            const formParagraph = document.createElement('p');
            formParagraph.textContent = 'Please fill out the form below to provide more details about your project.';

            // Append the heading and paragraph to the container
            serviceFormContainer.appendChild(formHeading);
            serviceFormContainer.appendChild(formParagraph);

            // Append the form to the container
            serviceFormContainer.appendChild(serviceContactForm);

            // Append the container to the plansContainer
            plansContainer.appendChild(serviceFormContainer);

            // Set the class for the plansContainer
            plansContainer.className = 'service-form-column';

            // Add event listener for form submission
            serviceContactForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default form submission
                // Get form data and convert it to an object
                const formData = new FormData(serviceContactForm);
                const object = Object.fromEntries(formData);

                newPlanDetails.planName = `${headerDiv.querySelector("h2").textContent}-${capitalizeFirstLetter(newPlanDetails.planName)}`;
                const newPlanDetailsString = Object.keys(newPlanDetails).map(key => `\n${key}: ${newPlanDetails[key]}`).join(', ');
                object.message = `**Purchase Request:**${newPlanDetailsString}\n\n${object.message}`;
                const json = JSON.stringify(object);

                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        window.location.href = 'https://tanvir-abid.github.io/DevVoyager/thanks.html';
                    } else {
                        alert('Message not sent.');
                    }
                })
                .catch(error => {
                    console.log(error);
                })




            });

        });



        backButton.addEventListener('click', () => {
            backButton.remove();
            // Call a function to re-create the plan details
            serviceDetailsContainer.remove();
            bodyDiv.appendChild(createServicePlansHTML(plans, headerDiv, bodyDiv, article));
        });

        // Append button to plan footer
        planFooter.appendChild(planBtn);

        // Append header, body, and footer to the plan card
        planCard.appendChild(planHeader);
        planCard.appendChild(planBody);
        planCard.appendChild(planFooter);

        // Append plan card to the plans container
        plansContainer.appendChild(planCard);
    }

    // Append service article container and plans container to service details container
    //serviceDetailsContainer.appendChild(serviceArticleContainer);
    serviceDetailsContainer.appendChild(plansContainer);

    return serviceDetailsContainer;
}



//------------------------------------------//
// create contact section //
//--------------------------------------//
function createContactSection(contactData) {
    // Create contact section
    const contactSection = document.createElement('section');
    contactSection.classList.add('contact-container','appear');
    contactSection.id = 'section-contact';

    // Contact Feature
    const contactFeature = document.createElement('div');
    contactFeature.classList.add('contact-feature');

    // Heading
    const heading = document.createElement('h1');
    heading.textContent = contactData.heading;

    // Subheading
    const subheading = document.createElement('p');
    subheading.textContent = contactData.subheading;

    // Contact Information
    const contactInfo = document.createElement('div');
    contactInfo.classList.add('contact-info');

    // Email
    const email = document.createElement('p');
    email.innerHTML = `<strong>${contactData.contactInfo.email.icon} Email:</strong> <span><a href="mailto:${contactData.contactInfo.email.value}">${contactData.contactInfo.email.value}</a></span>`;

    // Phone
    const phone = document.createElement('p');
    phone.innerHTML = `<strong>${contactData.contactInfo.phone.icon} Phone:</strong> <span>${contactData.contactInfo.phone.value}</span>`;

    // Address
    const address = document.createElement('p');
    address.innerHTML = `<strong>${contactData.contactInfo.address.icon} Address:</strong> <span>${contactData.contactInfo.address.value}</span>`;

    // Social Media
    const socialMedia = document.createElement('div');
    socialMedia.classList.add('social-media');

    contactData.socialMedia.forEach(social => {
        const icon = document.createElement('span');
        icon.innerHTML = social.icon;

        const link = document.createElement('a');
        link.href = social.url;
        link.target = '_blank';
        link.setAttribute("name",social.mediaName);
        link.appendChild(icon);

        socialMedia.appendChild(link);
    });

    // Append elements to contactInfo
    contactInfo.appendChild(email);
    contactInfo.appendChild(phone);
    contactInfo.appendChild(address);

    // create paymentInfo contents //
    const paymentInfoDiv = document.createElement('div');
    paymentInfoDiv.classList.add('payment-info-container');

    const paymentDiv = generatePaymentMethodsHTML(contactData['paymentInfo']);
    paymentInfoDiv.appendChild(paymentDiv);
    // Append elements to contactFeature
    contactFeature.appendChild(heading);
    contactFeature.appendChild(subheading);
    contactFeature.appendChild(contactInfo);
    contactFeature.appendChild(paymentInfoDiv);
    contactFeature.appendChild(socialMedia);

    // Contact Form
    const contactForm = document.createElement('div');
    contactForm.classList.add('contact-form');
    // form header
    const formHeader = document.createElement('div');
    formHeader.className = "form-header";
    // form heading
    const formHeading = document.createElement('h1');
    formHeading.textContent = "Get In Touch";
    // form heading
    const formSubHeading = document.createElement('p');
    formSubHeading.textContent = "We're open for any suggestion or just to have a chat.";

    formHeader.appendChild(formHeading);
    formHeader.appendChild(formSubHeading);
    contactForm.appendChild(formHeader);
    // Append the form to the contact form section
    let mainForm = createContactForm();
    mainForm.addEventListener('submit', function(e){
        e.preventDefault();

        const submitButton = mainForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = `<i class="fa-solid fa-spinner spin"></i> Submitting`;

        const formData = new FormData(mainForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                submitButton.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Submit`;
                window.location.href = 'https://tanvir-abid.github.io/DevVoyager/thanks.html';
            } else {
                alert('Message not sent.');
            }
        })
        .catch(error => {
            console.log(error);
        })
    })
    contactForm.appendChild(mainForm);

    // Append contactFeature and contactForm to the contact section
    contactSection.appendChild(contactFeature);
    contactSection.appendChild(contactForm);

    // Append the contact section to the main container or body
    document.getElementById('main-container').appendChild(contactSection);
}

function createContactForm() {
    // Create a simple contact form
    const form = document.createElement('form');
    form.method = 'POST';
    // Create a hidden input element
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'apikey';
    hiddenInput.value = 'c8fb6cf0-85ce-49d9-be34-cbe21e1f7c9b';

    // Add form elements (customize based on your needs)
    const nameGroup = createInputGroup('Name', 'name');
    const subjectGroup = createInputGroup('Subject', 'subject');
    const emailGroup = createInputGroup('Email', 'email');
    const messageGroup = createInputGroup('Message', 'message', 'textarea');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Submit`;

    // Append form elements to the form
    form.appendChild(hiddenInput);
    form.appendChild(nameGroup);
    form.appendChild(subjectGroup);
    form.appendChild(emailGroup);
    form.appendChild(messageGroup);
    form.appendChild(submitButton);

    return form;
}

function createInputGroup(labelText, inputName, inputType = 'text') {
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group');

    const label = document.createElement('label');
    label.textContent = labelText;
    label.setAttribute('for', inputName);

    let input;

    if (inputName.toLowerCase() === 'message') {
        // If input name is 'message', create a textarea
        input = document.createElement('textarea');
        input.placeholder = `Write Details About Your Project. . .`;
    } else {
        // For other input names, create a regular input
        input = document.createElement('input');
        input.type = inputType;
        input.placeholder = `Enter Your ${labelText} Here`;
    }

    if(inputName === 'file'){
        input.name = 'attachment';
    }else{
        input.name = inputName;
    }
    input.id = inputName;

    inputGroup.appendChild(label);
    inputGroup.appendChild(input);

    return inputGroup;
}
//-------------------------------------------------//
// get the previous section and clicked menu item, call function assigned to the item//
//---------------------------------------------------//
function handleMenuItemClicks(sectionID, previousSection,sectionData) {
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
    setTimeout(function () {
        mainContainer.removeChild(previousSection);
            // Handle click actions based on the menu item id
            if (sectionID === "home") {
                createSlideshow(sectionData.slides);
            } else if (sectionID === "about") {
                createAboutContainer(sectionData.texts);
            }else if(sectionID === "services"){
                createServicesSection(sectionData.services);
            }else if(sectionID === "skills"){
                createSkillsSection(sectionData);
            }else if(sectionID == "portfolio"){
                createPortfolioSection(sectionData.projects);
            }else if(sectionID == "contact"){
                createContactSection(sectionData);
            }else if(sectionID == "experience"){
                createEducationAndExperienceSection(sectionData);
            }else if(sectionID == "testimonials"){
                createTestimonialSection(sectionData);
            }
    }, 500);
}

function updateCopyrightYear() {
    // Create copyright div
    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('copyright');
    // Get the current year
    const userName = document.querySelector(".thumbnail-container .owner").getAttribute('user');
    // Add content to the copyright div
    copyrightDiv.innerHTML = `${userName} &copy; ${new Date().getFullYear()}. All rights reserved.`;

    // Append the copyright div to the sidebar
    const sidebarElement = document.getElementById('sidebar');
    document.body.appendChild(copyrightDiv);

    toggleTitle();
}

function toggleTitle() {
    const originalTitle = document.title;
    const alternateTitles = [
        'Builder of words, seeker of clicks', 
        'Craft, Connect, Convert', 
        'Building websites that convert'
    ];
    let currentIndex = 0;

    setInterval(() => {
        document.title = alternateTitles[currentIndex];
        
        setTimeout(() => {
            document.title = originalTitle;
        }, 3000);

        currentIndex = (currentIndex + 1) % alternateTitles.length;
    }, 5000);
}

//---------------------------------//
function generatePaymentMethodsHTML(paymentInfo) {
    const paymentMethodsContainer = document.createElement('div');
    paymentMethodsContainer.classList.add('payment-methods-container');

    const paymentMethodsHeader = document.createElement('h3');
    paymentMethodsHeader.textContent = 'We Accept These Payment Methods';
    paymentMethodsContainer.appendChild(paymentMethodsHeader);

    const paymentInfoContentsDiv = document.createElement('div');
    paymentInfoContentsDiv.className = "payment-info-contents-div";

    if (paymentInfo.length > 0) {
        const paymentInfoContents = document.createElement('div');
        paymentInfoContents.className = "payment-info-contents";

        const bdPaymentList = document.createElement('ul');
        bdPaymentList.classList.add('payment-list', 'bd-payment-list');

        paymentInfo.forEach(method => {
            const listItem = document.createElement('li');
            const icon = document.createElement('span');
            icon.innerHTML = method.icon;
            listItem.appendChild(icon);
            listItem.appendChild(document.createTextNode(method.method));
            bdPaymentList.appendChild(listItem);
        });
        paymentInfoContents.appendChild(bdPaymentList);
        paymentInfoContentsDiv.appendChild(paymentInfoContents);
    }

    paymentMethodsContainer.appendChild(paymentInfoContentsDiv);
    return paymentMethodsContainer;
}


// Function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
