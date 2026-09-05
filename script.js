/**
 * VELORA Skincare — Editorial E-Commerce Demo
 * Handles Sticky Nav, Scroll Reveal, Mobile Menu, Cart Drawer & Newsletter
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. STICKY NAVBAR BACKGROUND TRANSITION
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. MOBILE NAVIGATION MENU TOGGLE
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close when clicking nav links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. INTERSECTION OBSERVER FOR SCROLL REVEALS
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    revealObserver.observe(el);
  });

  // 4. INTERACTIVE CART DRAWER SYSTEM
  const cartToggle = document.getElementById('cart-toggle');
  const closeDrawer = document.getElementById('close-drawer');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartCountEl = document.getElementById('cart-count');
  const drawerCountEl = document.getElementById('drawer-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalPriceEl = document.getElementById('cart-total-price');

  let cart = [];

  function openCart() {
    cartDrawer.classList.add('active');
    cartBackdrop.classList.add('active');
  }

  function closeCart() {
    cartDrawer.classList.remove('active');
    cartBackdrop.classList.remove('active');
  }

  cartToggle.addEventListener('click', openCart);
  closeDrawer.addEventListener('click', closeCart);
  cartBackdrop.addEventListener('click', closeCart);

  // Quick Add Button Handlers
  document.querySelectorAll('.quick-add-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const name = e.target.getAttribute('data-name');
      const price = parseFloat(e.target.getAttribute('data-price'));

      cart.push({ name, price });
      updateCartUI();
      openCart();
    });
  });

  function updateCartUI() {
    // Update badge counts
    cartCountEl.textContent = cart.length;
    drawerCountEl.textContent = cart.length;

    // Render list
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your shopping bag is empty.</p>';
      cartTotalPriceEl.textContent = '$0.00';
    } else {
      cartItemsContainer.innerHTML = '';
      let total = 0;

      cart.forEach((item, index) => {
        total += item.price;
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item-row';
        itemRow.innerHTML = `
          <div>
            <div class="cart-item-name">${item.name}</div>
            <button style="font-size:0.7rem; color:#8C6252; text-decoration:underline; cursor:pointer;" onclick="removeItem(${index})">Remove</button>
          </div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        `;
        cartItemsContainer.appendChild(itemRow);
      });

      cartTotalPriceEl.textContent = `$${total.toFixed(2)}`;
    }
  }

  // Global scope helper to remove items from drawer
  window.removeItem = function(index) {
    cart.splice(index, 1);
    updateCartUI();
  };

  // 5. NEWSLETTER SUBMISSION MOCK
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMsg = document.getElementById('newsletter-msg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterMsg.textContent = 'Welcome to the inner circle. Your 15% code has been sent.';
      newsletterForm.reset();
      setTimeout(() => {
        newsletterMsg.textContent = '';
      }, 5000);
    });
  }
});
