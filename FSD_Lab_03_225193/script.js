document.addEventListener('DOMContentLoaded', () => {
    // 1. Elements Selection
    const descriptionText = document.getElementById('product-description');
    const copyWarning = document.getElementById('copy-warning');
    const themeSelect = document.getElementById('theme-select');
    const engravingInput = document.getElementById('engraving-input');
    const charCount = document.getElementById('char-count');
    const focusFeedback = document.getElementById('focus-feedback');
    const productPreview = document.getElementById('product-preview');
    const previewEngraving = document.getElementById('preview-engraving');
    const mugReflection = document.querySelector('.mug-reflection');
    const dropZone = document.getElementById('cart-drop-zone');
    const cartSummary = document.getElementById('cart-summary');
    const cartItems = document.getElementById('cart-items');
    const configForm = document.getElementById('config-form');
    const formFeedback = document.getElementById('form-feedback');
    const resetBtn = document.getElementById('reset-btn');
    const hoverTooltip = document.getElementById('hover-tooltip');

    // Default State Variables
    const defaultTheme = 'midnight';
    let cart = [];

    // --- EVENT LISTENERS ---

    // Event 1 & 2: Copy and Cut (Product Description Protection)
    const preventCopyCut = (e) => {
        e.preventDefault();
        copyWarning.classList.remove('hidden');
        copyWarning.style.opacity = '1';
        
        // Hide warning after 2 seconds
        setTimeout(() => {
            copyWarning.style.opacity = '0';
            setTimeout(() => copyWarning.classList.add('hidden'), 300);
        }, 2000);
    };

    descriptionText.addEventListener('copy', preventCopyCut);
    descriptionText.addEventListener('cut', preventCopyCut);

    // Event 3: Change (Theme Selection Update)
    themeSelect.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        
        // Remove existing theme classes
        productPreview.classList.remove('midnight', 'pearl', 'ocean', 'sunset');
        
        // Add new theme class
        productPreview.classList.add(selectedTheme);
    });

    // Event 4: Input (Real-time Engraving Text Update)
    engravingInput.addEventListener('input', (e) => {
        const text = e.target.value;
        previewEngraving.textContent = text;
        charCount.textContent = `${text.length}/15 characters`;
    });

    // Event 5 & 6: Focus and Blur (Input Field State)
    engravingInput.addEventListener('focus', () => {
        focusFeedback.classList.remove('hidden');
    });

    engravingInput.addEventListener('blur', () => {
        focusFeedback.classList.add('hidden');
    });

    // Event 7 & 8: Mouseenter and Mouseleave (Hover Interaction)
    productPreview.addEventListener('mouseenter', () => {
        productPreview.classList.add('hover-effect');
        hoverTooltip.classList.remove('hidden');
    });

    productPreview.addEventListener('mouseleave', () => {
        productPreview.classList.remove('hover-effect');
        hoverTooltip.classList.add('hidden');
        // Reset transform from mousemove
        productPreview.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });

    // Event 9: Mousemove (Interactive 3D Effect)
    productPreview.addEventListener('mousemove', (e) => {
        const rect = productPreview.getBoundingClientRect();
        
        // Calculate position relative to the element
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on pointer position (subtle effect)
        const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg
        const rotateY = ((x - centerX) / centerX) * 15;
        
        productPreview.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        
        // Move reflection
        const reflectionOffset = ((x / rect.width) * 100) - 50;
        mugReflection.style.transform = `translateX(${reflectionOffset}px)`;
    });

    // Event 10: Dragstart (Drag and Drop setup)
    productPreview.addEventListener('dragstart', (e) => {
        const productData = {
            theme: themeSelect.value,
            engraving: engravingInput.value || 'None'
        };
        e.dataTransfer.setData('application/json', JSON.stringify(productData));
        e.dataTransfer.effectAllowed = 'copy';
        
        setTimeout(() => {
            productPreview.style.opacity = '0.5';
        }, 0);
    });

    productPreview.addEventListener('dragend', () => {
        productPreview.style.opacity = '1';
        dropZone.classList.remove('drag-over');
    });

    // Event 11: Dragover (Drop Area Visuals)
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Necessary to allow dropping
        e.dataTransfer.dropEffect = 'copy';
        dropZone.classList.add('drag-over');
    });

    // Event 12: Dragleave (Drop Area Visuals Reset)
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    // Event 13: Drop (Adding to Cart)
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        
        try {
            const data = JSON.parse(e.dataTransfer.getData('application/json'));
            addToCart(data);
            
            // Visual feedback on dropzone
            dropZone.innerHTML = '<p style="color: #4ade80;">Added to Cart! ✅</p>';
            setTimeout(() => {
                dropZone.innerHTML = '<p>Drop Product Here</p>';
            }, 2000);
            
        } catch (error) {
            console.error('Error parsing dragged data', error);
        }
    });

    // Event 14: Submit (Form Submission)
    configForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        
        // Basic Validation
        const selectedThemeText = themeSelect.options[themeSelect.selectedIndex].text;
        const engraving = engravingInput.value.trim() || 'None';
        
        // Display result
        formFeedback.textContent = `Configuration Saved! Theme: ${selectedThemeText}, Engraving: ${engraving}`;
        formFeedback.classList.remove('hidden');
        
        setTimeout(() => {
            formFeedback.classList.add('hidden');
        }, 4000);
    });

    // Event 15: Reset (Form Reset via explicit button click or form reset event)
    resetBtn.addEventListener('click', () => {
        // Trigger native reset which handles inputs
        configForm.reset();
        
        // Manually reset custom states
        productPreview.className = 'product-preview midnight'; // Reset classes
        previewEngraving.textContent = '';
        charCount.textContent = '0/15 characters';
        formFeedback.classList.add('hidden');
        copyWarning.classList.add('hidden');
        
        // Optional: clear cart for full reset
        cart = [];
        updateCartDisplay();
        
        // Feedback
        dropZone.innerHTML = '<p style="color: var(--accent-color);">Reset Successful 🔄</p>';
        setTimeout(() => {
            dropZone.innerHTML = '<p>Drop Product Here</p>';
        }, 2000);
    });

    // Event 16: Scroll (Visual effect on header or other elements)
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.5)';
        } else {
            header.style.boxShadow = 'none';
        }
    });


    // Helper Functions
    function addToCart(product) {
        cart.push(product);
        updateCartDisplay();
    }

    function updateCartDisplay() {
        if (cart.length > 0) {
            cartSummary.classList.remove('hidden');
            cartItems.innerHTML = ''; // Clear current
            
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                const themeName = item.theme.charAt(0).toUpperCase() + item.theme.slice(1);
                li.innerHTML = `
                    <span>Mug (${themeName})</span>
                    <span>Text: ${item.engraving}</span>
                `;
                cartItems.appendChild(li);
            });
        } else {
            cartSummary.classList.add('hidden');
        }
    }
});
