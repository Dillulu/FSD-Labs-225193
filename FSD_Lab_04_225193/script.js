/**
 * ============================================================================
 * FSD LAB 04 - INTERACTIVE PRODUCT CUSTOMIZATION PLATFORM
 * Student: Hamza Tahir | Reg No: 225193 | Air University Kamra
 * Script: script.js
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    isPremium: false,
    selectedSize: 'Medium (350ml)',
    currentColorFilter: 'none',
    currentColorName: 'Charcoal Black',
    currentColorHex: '#1a1a1a',
    engravingText: '',
    engravingGraphic: 'none',
    engravingStyle: 'plain',
    cartItems: [],
    lottieInstance: null
  };

  // DOM Elements - Preview & Hero
  const productPreview = document.querySelector('#productPreview');
  const mugImage = document.querySelector('#mugImage');
  const previewOverlay = document.querySelector('#previewOverlay');
  const engravingTextDisplay = document.querySelector('#engravingText');
  const engravingGraphicDisplay = document.querySelector('#engravingGraphic');
  const engravingSubDisplay = document.querySelector('#engravingSub');
  const productDescription = document.querySelector('#productDescription');
  const protectionToast = document.querySelector('#protectionToast');
  const statusBadge = document.querySelector('#statusBadge');
  const lockIcon = document.querySelector('#lockIcon');
  const premiumControls = document.querySelector('#premiumControls');
  const premiumBanner = document.querySelector('#premiumLockedBanner');
  const upgradeBtn = document.querySelector('#upgradeBtn');

  // DOM Elements - Customization Controls
  const variantSelect = document.querySelector('#variantSelect');
  const colorOptionsContainer = document.querySelector('#colorOptions');
  const engravingInput = document.querySelector('#engravingInput');
  const charCount = document.querySelector('#charCount');
  const premiumGraphicSelect = document.querySelector('#premiumGraphic');
  const engravingStyleSelect = document.querySelector('#engravingStyle');
  const resetAllBtn = document.querySelector('#resetAllBtn');

  // DOM Elements - Cart & Drag & Drop
  const dropZone = document.querySelector('#dropZone');
  const cartItemsContainer = document.querySelector('#cartItems');
  const cartMessage = document.querySelector('#cartMessage');
  const placeOrderBtn = document.querySelector('#placeOrderBtn');
  const successAnimationBox = document.querySelector('#successAnimationBox');
  const lottieContainer = document.querySelector('#lottieContainer');

  // DOM Elements - Modals & Forms
  const paymentModal = document.querySelector('#paymentModal');
  const closeModal = document.querySelector('#closeModal');
  const paymentForm = document.querySelector('#paymentForm');
  const cardNameInput = document.querySelector('#cardName');
  const cardNumberInput = document.querySelector('#cardNumber');
  const expiryInput = document.querySelector('#expiry');
  const cvvInput = document.querySelector('#cvv');
  const processingMsg = document.querySelector('#processingMsg');
  const successMsg = document.querySelector('#successMsg');

  const orderModal = document.querySelector('#orderModal');
  const closeOrderModal = document.querySelector('#closeOrderModal');
  const confirmOrderBtn = document.querySelector('#confirmOrderBtn');
  const cardFormSection = document.querySelector('#cardFormSection');
  const orderProcessing = document.querySelector('#orderProcessing');

  // Bonus Interactive SVG elements
  const svgBadgeShape = document.querySelector('#svgBadgeShape');
  const svgMugFill = document.querySelector('#svgMugFill');

  /* --------------------------------------------------------------------------
     1. Product Information - Copy/Cut Protection
     -------------------------------------------------------------------------- */
  function showProtectionNotice(action) {
    if (!protectionToast) return;
    protectionToast.textContent = `⚠️ Action Prohibited: Product description text cannot be ${action}!`;
    protectionToast.classList.add('show');
    setTimeout(() => {
      protectionToast.classList.remove('show');
    }, 2800);
  }

  if (productDescription) {
    ['copy', 'cut'].forEach(eventType => {
      productDescription.addEventListener(eventType, (e) => {
        e.preventDefault();
        showProtectionNotice(eventType === 'copy' ? 'copied' : 'cut');
      });
    });

    productDescription.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showProtectionNotice('selected via context menu');
    });
  }

  /* --------------------------------------------------------------------------
     2. Product Customization - Colors, Variants, Engraving
     -------------------------------------------------------------------------- */
  // Handle Color Selection (Free & Premium)
  colorOptionsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.color-btn');
    if (!btn) return;

    if (btn.classList.contains('premium-btn') && !state.isPremium) {
      triggerPremiumLockedPrompt('Unlock Premium to access exclusive ceramic colors!');
      return;
    }

    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    state.currentColorFilter = btn.dataset.filter || 'none';
    state.currentColorName = btn.getAttribute('title') || 'Custom Color';
    state.currentColorHex = btn.style.backgroundColor || '#1a1a1a';

    mugImage.style.filter = state.currentColorFilter;

    // Update Interactive SVG Color (Bonus Feature)
    if (svgMugFill) {
      svgMugFill.setAttribute('fill', state.currentColorHex);
    }
  });

  // Variant (Size) Change
  variantSelect.addEventListener('change', () => {
    state.selectedSize = variantSelect.options[variantSelect.selectedIndex].text;
    if (variantSelect.value === 'Small') {
      productPreview.style.transform = 'scale(0.96)';
    } else if (variantSelect.value === 'Large') {
      productPreview.style.transform = 'scale(1.04)';
    } else {
      productPreview.style.transform = 'scale(1)';
    }
    setTimeout(() => {
      if (!productPreview.matches(':hover')) {
        productPreview.style.transform = '';
      }
    }, 400);
  });

  // Real-time Custom Name / Engraving with Character Limit Feedback
  engravingInput.addEventListener('input', function () {
    // Sanitize input to alphanumeric and basic punctuation
    let cleanVal = this.value.replace(/[^a-zA-Z0-9\s\-_.&!❤️★]/g, '');
    this.value = cleanVal;
    state.engravingText = cleanVal;

    engravingTextDisplay.textContent = cleanVal;

    const currentLen = cleanVal.length;
    charCount.textContent = `${currentLen}/18`;

    if (currentLen >= 15) {
      charCount.style.color = '#d13d62';
      charCount.style.fontWeight = 'bold';
    } else {
      charCount.style.color = '';
      charCount.style.fontWeight = '';
    }

    updateEngravingSubText();
  });

  function updateEngravingSubText() {
    if (state.engravingGraphic === 'none') {
      engravingSubDisplay.textContent = state.engravingText ? '• Handcrafted Ceramic •' : '';
    }
  }

  /* --------------------------------------------------------------------------
     3. Interactive Product Preview - 3D Tilt & Pointer Position
     -------------------------------------------------------------------------- */
  productPreview.addEventListener('mouseenter', () => {
    productPreview.style.transition = 'transform 0.1s ease-out, box-shadow 0.25s ease';
  });

  productPreview.addEventListener('mousemove', (e) => {
    const rect = productPreview.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate tilt angles based on cursor offset
    const tiltX = ((y - centerY) / centerY) * -12;
    const tiltY = ((x - centerX) / centerX) * 12;

    productPreview.style.transform = `perspective(700px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(1.03)`;

    // Interactive lighting highlight
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    previewOverlay.style.background = `radial-gradient(circle at ${percentX.toFixed(1)}% ${percentY.toFixed(1)}%, rgba(255, 255, 255, 0.35) 0%, rgba(226, 125, 151, 0.1) 45%, transparent 70%)`;
  });

  productPreview.addEventListener('mouseleave', () => {
    productPreview.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease';
    productPreview.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    previewOverlay.style.background = 'transparent';
  });

  /* --------------------------------------------------------------------------
     4. Product Drag-and-Drop to Cart
     -------------------------------------------------------------------------- */
  let isDraggingProduct = false;

  productPreview.addEventListener('dragstart', (e) => {
    isDraggingProduct = true;
    productPreview.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copyMove';
    e.dataTransfer.setData('text/plain', 'custom-mug');
  });

  productPreview.addEventListener('dragend', () => {
    isDraggingProduct = false;
    productPreview.classList.remove('dragging');
    dropZone.classList.remove('over');
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    dropZone.classList.add('over');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('over');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('over');

    if (isDraggingProduct || e.dataTransfer.getData('text/plain') === 'custom-mug') {
      addItemToCart();
    }
  });

  function addItemToCart() {
    const itemData = {
      id: Date.now(),
      size: state.selectedSize,
      color: state.currentColorName,
      engraving: state.engravingText || 'Standard (No Engraving)',
      style: state.engravingStyle,
      isPremium: state.isPremium
    };

    state.cartItems.push(itemData);

    // Update Drop Zone UI
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <span>☕ <strong>Ceramic Mug</strong> (${itemData.size}) — <em>${itemData.engraving}</em> [${itemData.color}]</span>
      <span style="color:#2e8b57; font-weight:800;">₨ 1,499</span>
    `;
    cartItemsContainer.appendChild(itemElement);

    // Show temporary feedback toast message
    cartMessage.textContent = '✓ Mug customized & added to cart!';
    cartMessage.classList.add('show');
    setTimeout(() => {
      cartMessage.classList.remove('show');
    }, 2500);

    // Pulse animation on the drop zone
    dropZone.style.borderColor = '#2e8b57';
    setTimeout(() => {
      dropZone.style.borderColor = '';
    }, 600);
  }

  /* --------------------------------------------------------------------------
     7. Lottie Animation Initialization (Order Confirmation)
     -------------------------------------------------------------------------- */
  function playSuccessLottie() {
    successAnimationBox.style.display = 'block';

    if (!state.lottieInstance && typeof lottie !== 'undefined') {
      try {
        state.lottieInstance = lottie.loadAnimation({
          container: lottieContainer,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          path: 'https://assets10.lottiefiles.com/packages/lf20_jbrw3hcz.json'
        });
      } catch (err) {
        console.warn('Lottie failed to load remotely, using CSS fallback animation', err);
      }
    } else if (state.lottieInstance) {
      state.lottieInstance.goToAndPlay(0, true);
    }
  }

  /* --------------------------------------------------------------------------
     8 & 9. Premium Customization & Lock Feature
     -------------------------------------------------------------------------- */
  function triggerPremiumLockedPrompt(customMsg) {
    alert(customMsg || 'This feature is exclusive to Premium Users. Please upgrade to unlock all colors and styles!');
    openPaymentModal();
  }

  // Graphic Style Selection
  premiumGraphicSelect.addEventListener('change', function () {
    if (!state.isPremium) {
      this.value = 'none';
      triggerPremiumLockedPrompt('Unlock Premium to add decorative icons and stamps!');
      return;
    }

    state.engravingGraphic = this.value;
    switch (this.value) {
      case 'heart':
        engravingGraphicDisplay.textContent = '❤️';
        engravingSubDisplay.textContent = '• Sweet Love Edition •';
        break;
      case 'star':
        engravingGraphicDisplay.textContent = '★';
        engravingSubDisplay.textContent = '• Special Star Edition •';
        break;
      case 'coffee':
        engravingGraphicDisplay.textContent = '☕';
        engravingSubDisplay.textContent = '• Fresh Roast Daily •';
        break;
      case 'crown':
        engravingGraphicDisplay.textContent = '👑';
        engravingSubDisplay.textContent = '• Royal Premium Mug •';
        break;
      case 'fire':
        engravingGraphicDisplay.textContent = '🔥';
        engravingSubDisplay.textContent = '• Hot & Fresh •';
        break;
      default:
        engravingGraphicDisplay.textContent = '';
        updateEngravingSubText();
    }
  });

  // Engraving Font Style Selection
  engravingStyleSelect.addEventListener('change', function () {
    if (!state.isPremium) {
      this.value = 'plain';
      triggerPremiumLockedPrompt('Unlock Premium to access luxury font typography styles!');
      return;
    }

    state.engravingStyle = this.value;
    if (this.value === 'script') {
      engravingTextDisplay.style.fontFamily = "'Brush Script MT', 'Dancing Script', cursive";
      engravingTextDisplay.style.fontSize = '1.3rem';
      engravingTextDisplay.style.fontWeight = 'normal';
    } else if (this.value === 'bold') {
      engravingTextDisplay.style.fontFamily = "'Arial Black', Impact, sans-serif";
      engravingTextDisplay.style.fontSize = '1.18rem';
      engravingTextDisplay.style.fontWeight = '900';
    } else {
      engravingTextDisplay.style.fontFamily = "'Segoe UI', sans-serif";
      engravingTextDisplay.style.fontSize = '1.05rem';
      engravingTextDisplay.style.fontWeight = '700';
    }
  });

  // Clicking locked section anywhere when not premium
  premiumControls.addEventListener('click', (e) => {
    if (!state.isPremium) {
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.tagName === 'SELECT' || target.tagName === 'LABEL') {
        e.preventDefault();
        triggerPremiumLockedPrompt();
      }
    }
  });

  /* --------------------------------------------------------------------------
     10, 11, 12. Premium Upgrade Payment Modal & Strict Validation
     -------------------------------------------------------------------------- */
  function openPaymentModal() {
    paymentModal.classList.add('open');
    paymentForm.hidden = false;
    processingMsg.hidden = true;
    successMsg.hidden = true;
  }

  function closePaymentModalWindow() {
    paymentModal.classList.remove('open');
  }

  upgradeBtn.addEventListener('click', () => {
    if (state.isPremium) {
      alert('You are already enjoying full Premium privileges!');
    } else {
      openPaymentModal();
    }
  });

  closeModal.addEventListener('click', closePaymentModalWindow);
  paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) closePaymentModalWindow();
  });

  // Real-time Formatting for Payment Card Fields
  cardNumberInput.addEventListener('input', function () {
    let raw = this.value.replace(/\D/g, '').substring(0, 16);
    this.value = raw.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  });

  expiryInput.addEventListener('input', function () {
    let raw = this.value.replace(/\D/g, '').substring(0, 4);
    if (raw.length > 2) {
      this.value = raw.substring(0, 2) + '/' + raw.substring(2);
    } else {
      this.value = raw;
    }
  });

  cvvInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').substring(0, 4);
  });

  // Field Validation Helper Functions
  function setFieldValidity(input, isValid, errorMsg) {
    const errorDisplay = input.parentElement.querySelector('.error');
    if (!isValid) {
      input.classList.add('invalid');
      if (errorDisplay) errorDisplay.textContent = errorMsg;
    } else {
      input.classList.remove('invalid');
      if (errorDisplay) errorDisplay.textContent = '';
    }
    return isValid;
  }

  function validateCardholderName() {
    const val = cardNameInput.value.trim();
    if (!val) {
      return setFieldValidity(cardNameInput, false, 'Cardholder name is required.');
    }
    if (!/^[a-zA-Z\s]{3,35}$/.test(val)) {
      return setFieldValidity(cardNameInput, false, 'Please enter a valid alphabet name (3-35 chars).');
    }
    return setFieldValidity(cardNameInput, true);
  }

  function validateCardNumber() {
    const digits = cardNumberInput.value.replace(/\s/g, '');
    if (digits.length !== 16) {
      return setFieldValidity(cardNumberInput, false, 'Card number must be exactly 16 digits.');
    }
    return setFieldValidity(cardNumberInput, true);
  }

  function validateExpiryDate() {
    const val = expiryInput.value.trim();
    if (!/^\d{2}\/\d{2}$/.test(val)) {
      return setFieldValidity(expiryInput, false, 'Format must be MM/YY.');
    }
    const [month, year] = val.split('/').map(Number);
    if (month < 1 || month > 12) {
      return setFieldValidity(expiryInput, false, 'Month must be between 01 and 12.');
    }
    if (year < 24) {
      return setFieldValidity(expiryInput, false, 'Card has expired.');
    }
    return setFieldValidity(expiryInput, true);
  }

  function validateCVV() {
    const val = cvvInput.value.trim();
    if (val.length < 3 || val.length > 4) {
      return setFieldValidity(cvvInput, false, 'CVV must be 3 or 4 digits.');
    }
    return setFieldValidity(cvvInput, true);
  }

  [cardNameInput, cardNumberInput, expiryInput, cvvInput].forEach(inp => {
    inp.addEventListener('blur', () => {
      if (inp === cardNameInput) validateCardholderName();
      if (inp === cardNumberInput) validateCardNumber();
      if (inp === expiryInput) validateExpiryDate();
      if (inp === cvvInput) validateCVV();
    });
  });

  // Handle Simulated Payment Form Submission
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateCardholderName();
    const isCardValid = validateCardNumber();
    const isExpiryValid = validateExpiryDate();
    const isCvvValid = validateCVV();

    if (!isNameValid || !isCardValid || !isExpiryValid || !isCvvValid) {
      return;
    }

    // Processing simulated payment
    paymentForm.hidden = true;
    processingMsg.hidden = false;

    setTimeout(() => {
      processingMsg.hidden = true;
      successMsg.hidden = false;

      // Activate Premium State
      activatePremiumStatus();

      setTimeout(() => {
        closePaymentModalWindow();
      }, 1600);
    }, 1500);
  });

  function activatePremiumStatus() {
    state.isPremium = true;

    // 11. Update Premium Status dynamically without reload
    statusBadge.textContent = '★ Premium User';
    statusBadge.className = 'status-badge premium';

    lockIcon.textContent = '🔓';
    if (premiumBanner) {
      premiumBanner.style.display = 'none';
    }

    premiumControls.classList.remove('locked');

    // Unlock controls
    document.querySelectorAll('.premium-btn').forEach(btn => {
      btn.disabled = false;
      btn.style.opacity = '1';
    });
    premiumGraphicSelect.disabled = false;
    engravingStyleSelect.disabled = false;

    upgradeBtn.textContent = '✓ Premium Active';
    upgradeBtn.disabled = true;
    upgradeBtn.style.opacity = '0.85';
    upgradeBtn.style.background = '#2e8b57';

    // Update Interactive SVG Premium Badge
    if (svgBadgeShape) {
      svgBadgeShape.setAttribute('fill', '#e5a93c');
    }
  }

  /* --------------------------------------------------------------------------
     Order Placement Modal & Processing
     -------------------------------------------------------------------------- */
  placeOrderBtn.addEventListener('click', () => {
    if (state.cartItems.length === 0) {
      alert('Your cart is empty! Please drag the customized mug into the drop zone first.');
      return;
    }

    orderModal.classList.add('open');
    orderProcessing.hidden = true;
    cardFormSection.style.display = 'none';
    const codRadio = document.querySelector('#cod');
    if (codRadio) codRadio.checked = true;
  });

  closeOrderModal.addEventListener('click', () => orderModal.classList.remove('open'));
  orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) orderModal.classList.remove('open');
  });

  document.querySelectorAll('input[name="pay"]').forEach(radio => {
    radio.addEventListener('change', function () {
      cardFormSection.style.display = this.value === 'card' ? 'block' : 'none';
    });
  });

  confirmOrderBtn.addEventListener('click', () => {
    const selectedMethod = document.querySelector('input[name="pay"]:checked')?.value || 'cod';

    if (selectedMethod === 'card') {
      const orderName = document.querySelector('#orderCardName');
      const orderNum = document.querySelector('#orderCardNumber');
      const orderExp = document.querySelector('#orderExpiry');
      const orderCvv = document.querySelector('#orderCvv');

      let isValid = true;
      if (!orderName.value.trim()) {
        orderName.nextElementSibling.textContent = 'Required';
        isValid = false;
      } else orderName.nextElementSibling.textContent = '';

      if (orderNum.value.replace(/\s/g, '').length !== 16) {
        orderNum.nextElementSibling.textContent = '16 digits required';
        isValid = false;
      } else orderNum.nextElementSibling.textContent = '';

      if (!/^\d{2}\/\d{2}$/.test(orderExp.value)) {
        orderExp.nextElementSibling.textContent = 'MM/YY required';
        isValid = false;
      } else orderExp.nextElementSibling.textContent = '';

      if (orderCvv.value.length < 3) {
        orderCvv.nextElementSibling.textContent = '3-4 digits';
        isValid = false;
      } else orderCvv.nextElementSibling.textContent = '';

      if (!isValid) return;
    }

    orderProcessing.hidden = false;
    confirmOrderBtn.style.display = 'none';

    setTimeout(() => {
      orderModal.classList.remove('open');
      confirmOrderBtn.style.display = 'block';
      orderProcessing.hidden = true;

      // Trigger Lottie Success Animation
      playSuccessLottie();
    }, 1400);
  });

  // Order modal input helpers
  const orderCardNum = document.querySelector('#orderCardNumber');
  if (orderCardNum) {
    orderCardNum.addEventListener('input', function () {
      let d = this.value.replace(/\D/g, '').substring(0, 16);
      this.value = d.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  const orderExpiry = document.querySelector('#orderExpiry');
  if (orderExpiry) {
    orderExpiry.addEventListener('input', function () {
      let d = this.value.replace(/\D/g, '').substring(0, 4);
      this.value = d.length > 2 ? d.substring(0, 2) + '/' + d.substring(2) : d;
    });
  }

  const orderCvvEl = document.querySelector('#orderCvv');
  if (orderCvvEl) {
    orderCvvEl.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '').substring(0, 4);
    });
  }

  /* --------------------------------------------------------------------------
     13. Form Reset - Reset All Application State & Controls
     -------------------------------------------------------------------------- */
  resetAllBtn.addEventListener('click', () => {
    // Reset state values
    state.isPremium = false;
    state.selectedSize = 'Medium (350ml)';
    state.currentColorFilter = 'none';
    state.currentColorName = 'Charcoal Black';
    state.currentColorHex = '#1a1a1a';
    state.engravingText = '';
    state.engravingGraphic = 'none';
    state.engravingStyle = 'plain';
    state.cartItems = [];

    // Reset Badge & Lock
    statusBadge.textContent = 'Free User';
    statusBadge.className = 'status-badge free';
    lockIcon.textContent = '🔒';
    if (premiumBanner) premiumBanner.style.display = 'flex';
    premiumControls.classList.add('locked');

    // Reset Buttons
    upgradeBtn.textContent = '⚡ Upgrade to Premium (₨ 499)';
    upgradeBtn.disabled = false;
    upgradeBtn.style.opacity = '1';
    upgradeBtn.style.background = '';

    document.querySelectorAll('.premium-btn').forEach(btn => {
      btn.disabled = true;
    });

    // Reset Color active states
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
    const defaultColorBtn = document.querySelector('.color-btn[data-filter="none"]');
    if (defaultColorBtn) defaultColorBtn.classList.add('active');

    // Reset Visual Preview
    mugImage.style.filter = 'none';
    productPreview.style.transform = '';
    variantSelect.value = 'Medium';
    engravingInput.value = '';
    engravingTextDisplay.textContent = '';
    engravingGraphicDisplay.textContent = '';
    engravingSubDisplay.textContent = '';
    charCount.textContent = '0/18';
    charCount.style.color = '';

    premiumGraphicSelect.value = 'none';
    premiumGraphicSelect.disabled = true;
    engravingStyleSelect.value = 'plain';
    engravingStyleSelect.disabled = true;

    engravingTextDisplay.style.fontFamily = "'Segoe UI', sans-serif";
    engravingTextDisplay.style.fontSize = '1.05rem';
    engravingTextDisplay.style.fontWeight = '700';

    // Reset Cart & Animation
    cartItemsContainer.innerHTML = '';
    cartMessage.classList.remove('show');
    successAnimationBox.style.display = 'none';
    if (state.lottieInstance) {
      state.lottieInstance.stop();
    }

    // Reset SVG bonus
    if (svgBadgeShape) svgBadgeShape.setAttribute('fill', '#9c8388');
    if (svgMugFill) svgMugFill.setAttribute('fill', '#1a1a1a');

    // Reset payment forms
    paymentForm.reset();
    document.querySelectorAll('.error').forEach(err => err.textContent = '');
    document.querySelectorAll('input.invalid').forEach(inp => inp.classList.remove('invalid'));

    alert('Application and all customizations have been reset to initial state!');
  });

  /* --------------------------------------------------------------------------
     Demo URL Parameter Helpers (for Automated Verification & Showcase)
     -------------------------------------------------------------------------- */
  const params = new URLSearchParams(window.location.search);
  const demoMode = params.get('demo');

  if (demoMode === 'customized') {
    engravingInput.value = 'Hamza Tahir 225193';
    engravingInput.dispatchEvent(new Event('input'));
    const rubyBtn = document.querySelector('.color-btn[title="Ruby Crimson"]');
    if (rubyBtn) rubyBtn.click();
    addItemToCart();
  } else if (demoMode === 'payment') {
    openPaymentModal();
    cardNameInput.value = 'Hamza Tahir';
    cardNumberInput.value = '4242 4242 4242 4242';
    expiryInput.value = '12/28';
    cvvInput.value = '786';
  } else if (demoMode === 'premium_unlocked') {
    activatePremiumStatus();
    engravingInput.value = 'Hamza Tahir 225193';
    engravingInput.dispatchEvent(new Event('input'));
    const navyBtn = document.querySelector('.color-btn[title="Deep Navy"]');
    if (navyBtn) navyBtn.click();
    premiumGraphicSelect.value = 'crown';
    premiumGraphicSelect.dispatchEvent(new Event('change'));
    engravingStyleSelect.value = 'script';
    engravingStyleSelect.dispatchEvent(new Event('change'));
    addItemToCart();
  } else if (demoMode === 'order_success') {
    addItemToCart();
    playSuccessLottie();
  }
});

