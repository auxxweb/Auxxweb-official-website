const blogPosts = [
    {
        type: 'image',
        image: './img/docker.png',
        title: 'Mastering Docker: A Guide to Containerization',
        date: 'August 10, 2024',
        shortContent: 'Explore the power of Docker in modern software development. Learn how containerization is revolutionizing the way we build, ship, and run applications.',
        longContent: 'Docker enables developers to package applications and their dependencies into a standardized unit for software development. This post also covers practical use cases, such as creating Docker images and deploying containers.'
    },
    {
        type: 'image',
        image: './img/kub.png',
        title: 'Kubernetes: Orchestrating Containers at Scale',
        date: 'July 25, 2024',
        shortContent: 'Discover how Kubernetes automates the deployment, scaling, and management of containerized applications. Key features include automated container deployment',
        longContent: 'Kubernetes provides a robust framework for managing containerized applications across clusters. Key features include automated container deployment, scaling, and load balancing.'
    },
    {
        type: 'image',
        image: './img/devops.png',
        title: 'DevOps: Bridging the Gap Between Development and Operations',
        date: 'June 30, 2024',
        shortContent: 'Learn about the DevOps culture and its role in breaking down the silos between development and operations teams.',
        longContent: 'DevOps is a cultural shift that emphasizes collaboration between development and operations teams. The post includes insights into popular DevOps tools like Jenkins, Docker, and Kubernetes.'
    }
];

async function fetchSheetData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxWrnnr7iFcHibR1hVocSOwBif3AAVfJzJUwRBbZMKc6gjfeVDvOVEOEnKPRerozHvE/exec');
        const data = await response.json();
        console.log(data, "new posts data...");
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];  // Return an empty array on error
    }
}

async function initializeBlog() {
    const blogContainer = document.querySelector('#blog-cards .row.g-4');
    const loadingScreen = document.getElementById('loadingScreen');

    // Show the loading screen
    loadingScreen.style.display = 'flex';

    // Fetch data from the external source
    const fetchedPosts = await fetchSheetData();
    const postsToDisplay = blogPosts.concat(fetchedPosts);

    function generateBlogCard(post) {
        // Convert the date string into a Date object
        const date = new Date(post.date);

        // Format the date as desired
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return `
            <div class="col-lg-4 col-md-6">
                <div class="bg-light rounded blog-post">
                    <div class="position-relative">
                        <img class="img-fluid blog-image" src="${post.image}" alt="Blog Post Image">
                        <div class="position-absolute top-0 start-0 bg-primary-gradient text-white rounded-end py-2 px-4">${formattedDate}</div>
                    </div>
                    <div class="p-4 d-flex flex-column">
                        <h4 class="mb-3">${post.title}</h4>
                        <p class="short-content">${post.shortContent}</p>
                        <p class="long-content d-none">${post.longContent}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Render the blog posts after data is fetched
    postsToDisplay.forEach((post) => {
        blogContainer.innerHTML += generateBlogCard(post);
    });

    // Hide the loading screen
    loadingScreen.style.display = 'none';
}

// Initialize the blog after DOM content is fully loaded
document.addEventListener('DOMContentLoaded', initializeBlog);
