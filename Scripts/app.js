// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          // Get the href attribute
          const targetId = this.getAttribute('href');
          
          // Skip if href is not a section anchor
          if (!targetId.startsWith('#') || targetId === '#') return;
          
          e.preventDefault();
          
          // Get target element
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              // Scroll to target with smooth animation
              window.scrollTo({
                  top: targetElement.offsetTop - 75,
                  behavior: 'smooth'
              });
              
              // Update active state in navigation
              navLinks.forEach(navLink => navLink.classList.remove('active'));
              this.classList.add('active');
              
              // Close navbar collapse on mobile
              const navbarCollapse = document.querySelector('.navbar-collapse');
              if (navbarCollapse.classList.contains('show')) {
                  document.querySelector('.navbar-toggler').click();
              }
          }
      });
  });
  
  // Update active navigation item on scroll
  window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      
      // Get all sections
      const sections = document.querySelectorAll('section, header');
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop - 150;
          const sectionBottom = sectionTop + section.offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
              navLinks.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === '#' + sectionId) {
                      link.classList.add('active');
                  }
              });
          }
      });
  });
  
  // Handle contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const phone = document.getElementById('phone').value;
          const subject = document.getElementById('subject').value;
          const message = document.getElementById('message').value;
          
          // Basic validation
          if (!name || !email || !message) {
              alert('Please fill in all required fields.');
              return;
          }
          
          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
              alert('Please enter a valid email address.');
              return;
          }
          
          // Simulate form submission
          alert('Thank you for your message! We will get back to you soon.');
          contactForm.reset();
      });
  }
  
  // Add animation to collection cards
  const collectionCards = document.querySelectorAll('.collection-card');
  collectionCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
  });
  
  // Add animation to service boxes
  const serviceBoxes = document.querySelectorAll('.service-box');
  serviceBoxes.forEach((box, index) => {
      box.style.animationDelay = `${index * 0.2}s`;
  });
  
  // Add testimonial slider functionality
  // This is a simple version, can be replaced with a proper carousel library
  let testimonialIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial-card');
  
  function showTestimonials() {
      if (window.innerWidth < 768) {
          // Show only one testimonial on mobile
          testimonials.forEach((testimonial, index) => {
              if (index === testimonialIndex) {
                  testimonial.style.display = 'block';
              } else {
                  testimonial.style.display = 'none';
              }
          });
          
          // Auto-rotate testimonials
          setInterval(() => {
              testimonialIndex = (testimonialIndex + 1) % testimonials.length;
              showTestimonials();
          }, 5000);
      } else {
          // Show all testimonials on larger screens
          testimonials.forEach(testimonial => {
              testimonial.style.display = 'block';
          });
      }
  }
  
  // Initial call and resize listener
  showTestimonials();
  window.addEventListener('resize', showTestimonials);
  
  // Back to top button functionality
  window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
          document.querySelector('.back-to-top').classList.add('show');
      } else {
          document.querySelector('.back-to-top').classList.remove('show');
      }
  });
  
  // Special offers popup timer
  setTimeout(() => {
      // Can uncomment and customize this to show a promotion popup
      // const popup = document.createElement('div');
      // popup.className = 'promo-popup';
      // popup.innerHTML = `
      //     <div class="promo-content">
      //         <button class="close-promo">&times;</button>
      //         <h3>Special Offer!</h3>
      //         <p>Get 20% off on all designer frames this month!</p>
      //         <a href="#collections" class="btn btn-primary">Shop Now</a>
      //     </div>
      // `;
      // document.body.appendChild(popup);
      
      // document.querySelector('.close-promo').addEventListener('click', () => {
      //     popup.remove();
      // });
  }, 5000);
  
  // Image replacement (for when real images are available)
  // Replace all placeholder images with real images
  // const placeholderImages = document.querySelectorAll('img[src*="placeholder"]');
  // placeholderImages.forEach((img, index) => {
  //     // Replace with actual image URLs when available
  //     // img.src = 'path/to/real/image-' + index + '.jpg';
  // });
});




// For future enhancement: Add product filtering functionality
function filterProducts(category) {
  const products = document.querySelectorAll('.collection-card');
  
  products.forEach(product => {
      const productCategory = product.getAttribute('data-category');
      
      if (category === 'all' || productCategory === category) {
          product.style.display = 'block';
      } else {
          product.style.display = 'none';
      }
  });
}

// Add search functionality
function searchProducts(query) {
  const products = document.querySelectorAll('.collection-card');
  query = query.toLowerCase();
  
  products.forEach(product => {
      const title = product.querySelector('.card-title').textContent.toLowerCase();
      const description = product.querySelector('.card-text').textContent.toLowerCase();
      
      if (title.includes(query) || description.includes(query)) {
          product.style.display = 'block';
      } else {
          product.style.display = 'none';
      }
  });
}

// Add back to top button functionality (create the button in JS)
function createBackToTopButton() {
  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(button);
  
  button.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
}

// Call the function to create the back to top button
createBackToTopButton();

// Add newsletter subscription functionality
function setupNewsletterForm() {
  const footerForm = document.getElementById('newsletterForm');
  
  if (footerForm) {
      footerForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const email = document.getElementById('newsletterEmail').value;
          
          // Basic email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
              alert('Please enter a valid email address.');
              return;
          }
          
          // Simulate newsletter subscription
          alert('Thank you for subscribing to our newsletter!');
          footerForm.reset();
      });
  }
}

// Call the function to setup newsletter form if it exists
setupNewsletterForm();

// Add event listeners for window load to enhance user experience
window.addEventListener('load', function() {
  // Hide page loader if exists
  const pageLoader = document.querySelector('.page-loader');
  if (pageLoader) {
      pageLoader.style.display = 'none';
  }
  
  // Animate elements when they come into view
  const animateOnScroll = function() {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      
      animatedElements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 50) {
              element.classList.add('animated');
          }
      });
  };
  
  // Initial call and scroll listener for animations
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  
  // Add hover effects to navigation items
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
          this.classList.add('nav-hover');
      });
      
      item.addEventListener('mouseleave', function() {
          this.classList.remove('nav-hover');
      });
  });
  
  // Add parallax effect to hero section
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
      window.addEventListener('scroll', function() {
          const scrollPosition = window.scrollY;
          
          if (scrollPosition < 600) {
              heroSection.style.backgroundPositionY = scrollPosition * 0.4 + 'px';
          }
      });
  }
  
  // Add click events to collection cards for future product detail view
  const collectionCards = document.querySelectorAll('.collection-card');
  
  collectionCards.forEach(card => {
      card.addEventListener('click', function(e) {
          // Only trigger if the card itself was clicked, not buttons inside it
          if (e.target.classList.contains('btn')) return;
          
          const title = this.querySelector('.card-title').textContent;
          console.log(`Product clicked: ${title}`);
          
          // For future implementation: Show product details modal or navigate to product page
          // showProductDetails(productId);
      });
  });
  
  // Add modal functionality for future product quick view
  function createModal() {
      const modal = document.createElement('div');
      modal.className = 'product-modal';
      modal.innerHTML = `
          <div class="modal-content">
              <span class="close-modal">&times;</span>
              <div class="modal-body">
                  <!-- Product details will be inserted here -->
              </div>
          </div>
      `;
      
      document.body.appendChild(modal);
      
      document.querySelector('.close-modal').addEventListener('click', () => {
          modal.style.display = 'none';
      });
      
      // Close modal when clicking outside
      window.addEventListener('click', (e) => {
          if (e.target === modal) {
              modal.style.display = 'none';
          }
      });
      
      return modal;
  }
  
  // Create modal for future use
  const productModal = createModal();
  
  // Function to show product details in modal (for future use)
  window.showProductDetails = function(productId) {
      const modalBody = productModal.querySelector('.modal-body');
      
      // In a real application, you would fetch product details from a database
      // For now, we'll use placeholder content
      modalBody.innerHTML = `
          <div class="row">
              <div class="col-md-6">
                  <img src="/api/placeholder/400/400" alt="Product Image" class="img-fluid">
              </div>
              <div class="col-md-6">
                  <h3>Product Name</h3>
                  <p class="price">$199.99</p>
                  <p class="description">Product description goes here. This would normally contain details about the product.</p>
                  <div class="product-options">
                      <div class="option-group">
                          <label>Color:</label>
                          <select class="form-select">
                              <option>Black</option>
                              <option>Brown</option>
                              <option>Blue</option>
                          </select>
                      </div>
                      <div class="option-group">
                          <label>Size:</label>
                          <select class="form-select">
                              <option>Small</option>
                              <option>Medium</option>
                              <option>Large</option>
                          </select>
                      </div>
                  </div>
                  <div class="product-actions mt-4">
                      <button class="btn btn-primary">Add to Cart</button>
                      <button class="btn btn-outline-dark ms-2">Add to Wishlist</button>
                  </div>
              </div>
          </div>
      `;
      
      productModal.style.display = 'block';
  };
  
  // Add lazy loading functionality for images
  if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const img = entry.target;
                  const dataSrc = img.getAttribute('data-src');
                  
                  if (dataSrc) {
                      img.src = dataSrc;
                      img.removeAttribute('data-src');
                  }
                  
                  observer.unobserve(img);
              }
          });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
      });
  }
});
