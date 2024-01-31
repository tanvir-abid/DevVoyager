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

document.addEventListener("DOMContentLoaded",async function(){
    let alldata = await getdata();
    console.log(alldata);
    // generate bubbles //
    const bubbleContainer = document.createElement('div');
    bubbleContainer.classList.add('bubble-container');

    for (let i = 0; i < 5; i++) {
        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add("bubble",`bubble${i+1}`)
        bubbleContainer.appendChild(bubbleDiv);
    }
    document.body.append(bubbleContainer);
    //------------------------------------//
    let container = document.createElement('div');
    container.id = "container";

    // Create Sidebar
    let sidebar = document.createElement('div');
    sidebar.id = 'sidebar';

    let thumbnailDiv = document.createElement('div');
    thumbnailDiv.classList.add("thumbnail-container");

    // Portfolio Owner Information
    let homeData = alldata['section-home'];
    console.log(homeData["ownerInfo"].name);
    let ownerPhoto = document.createElement('img');
    ownerPhoto.src = homeData["ownerInfo"].thumbnailURL; // Replace with the actual path
    ownerPhoto.alt = 'Owner Photo';

    let ownerName = document.createElement('p');
    ownerName.className = "owner";
    ownerName.textContent = homeData["ownerInfo"].name;

    let ownerDesignation = document.createElement('p');
    ownerDesignation.className = "designation";
    ownerDesignation.textContent = homeData["ownerInfo"].designation;

    thumbnailDiv.appendChild(ownerPhoto);
    thumbnailDiv.appendChild(ownerName);
    thumbnailDiv.appendChild(ownerDesignation);

    // Social Media
    let socialMediaData = alldata['section-contact'].socialMedia;
    console.log(socialMediaData);
    const socialMedia = document.createElement('div');
    socialMedia.classList.add('social-media');

    alldata['section-contact'].socialMedia.forEach(social => {
        const icon = document.createElement('span');
        icon.innerHTML = social.icon;

        const link = document.createElement('a');
        link.href = social.url;
        link.title = social.mediaName;
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
                let dataForNextSection = alldata[`section-${menuItem.id}`];
                //console.log(dataForNextSection);
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
    //createAboutContainer(alldata['section-about'].texts);
    //createServicesSection(alldata['section-services'].services);
    //createPortfolioSection(alldata['section-portfolio'].projects);
    //createContactSection(alldata['section-contact']);
});

//------------------------------------------//
// create slide show //
//--------------------------------------//
// Function to create the slideshow container
function createSlideshow(slidesData) {
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
    aboutTitle.textContent = 'About Us';

    const aboutSubtitle = document.createElement('h3');
    aboutSubtitle.textContent = 'Our Story';

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

    // Create container for services
    const servicesContainer = document.createElement('div');
    servicesContainer.classList.add('services-container');

    // Loop through each service object in the array
    servicesArray.forEach(serviceData => {
        // Create service div
        const serviceDiv = document.createElement('div');
        serviceDiv.classList.add('service');

        // Create service icon element
        const serviceIcon = document.createElement('span');
        serviceIcon.innerHTML= serviceData.icon;

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
// create Portfolio section //
//--------------------------------------//
function createPortfolioSection(projects) {
    // Create portfolio section
    const portfolioSection = document.createElement('section');
    portfolioSection.id = 'section-portfolio';

    // Create tabs container
    const tabsContainer = document.createElement('div');
    tabsContainer.classList.add('tabs-container');

    // Create tabs
    const tabs = ['All', 'Web Design', 'SEO', 'Content Writing'];
    let arrayOfTabs =[];

    tabs.forEach((tabName,index) => {
        const tab = document.createElement('div');
        tab.textContent = tabName;
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

        // Tags in the card body
        const tags = document.createElement('p');
        tags.classList.add('tags');
        project.tags.forEach(tag => {
            const spanTag = document.createElement('span');
            spanTag.textContent = tag;
            tags.appendChild(spanTag);
        });

        cardHeader.appendChild(image);
        cardHeader.appendChild(tags);

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
        link.appendChild(icon);

        socialMedia.appendChild(link);
    });

    // Append elements to contactInfo
    contactInfo.appendChild(email);
    contactInfo.appendChild(phone);
    contactInfo.appendChild(address);

    // Append elements to contactFeature
    contactFeature.appendChild(heading);
    contactFeature.appendChild(subheading);
    contactFeature.appendChild(contactInfo);
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
    // Create a simple contact form
    const form = document.createElement('form');

    // Add form elements (customize based on your needs)
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';

    const messageLabel = document.createElement('label');
    messageLabel.textContent = 'Message:';
    const messageTextarea = document.createElement('textarea');
    messageTextarea.name = 'message';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Submit`;

    // Append form elements to the form
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(messageLabel);
    form.appendChild(messageTextarea);
    form.appendChild(submitButton);

    // Append the form to the contact form section
    contactForm.appendChild(form);

    // Append contactFeature and contactForm to the contact section
    contactSection.appendChild(contactFeature);
    contactSection.appendChild(contactForm);

    // Append the contact section to the main container or body
    document.getElementById('main-container').appendChild(contactSection);
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
    // Remove the previous section from the main container after 0.5s
    console.log(sectionData);
    setTimeout(function () {
        mainContainer.removeChild(previousSection);
            // Handle click actions based on the menu item id
            if (sectionID === "home") {
                createSlideshow(sectionData.slides);
            } else if (sectionID === "about") {
                createAboutContainer(sectionData.texts);
            }else if(sectionID === "services"){
                createServicesSection(sectionData.services);
            }else if(sectionID == "portfolio"){
                createPortfolioSection(sectionData.projects);
            }else if(sectionID == "contact"){
                createContactSection(sectionData);
            }
    }, 500);
}