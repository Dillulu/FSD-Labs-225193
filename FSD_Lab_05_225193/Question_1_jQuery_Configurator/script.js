/**
 * Full Stack Development (CS-301L) - Lab 05
 * Student Name: Hamza Tahir
 * Registration ID: 225193
 * 
 * Question 1: Interactive Product Configurator with jQuery
 * Demonstrates:
 * - jQuery Selectors (ID, Class, Element, Attribute)
 * - jQuery Event Handling (click, input, change, submit)
 * - Real-time DOM Manipulation & Content Modification (.text(), .html(), .val(), .append())
 * - Class & Attribute Toggling (.addClass(), .removeClass(), .prop(), .attr())
 * - Interactive Product Preview with live updates
 * - Simulated Premium Purchase Unlocking Advanced Features
 */

$(document).ready(function () {
    console.log("jQuery loaded successfully: Version " + $.fn.jquery);

    // 1. Initial State Definition
    const configState = {
        name: "Smart Thermal Tumbler Pro",
        basePrice: 79.99,
        selectedSize: 12,
        sizePrice: 79.99,
        colorKey: "midnight",
        colorName: "Midnight Slate",
        engravingText: "",
        fontStyle: "modern",
        isPremiumUnlocked: false,
        premiumAddonPrice: 0.00,
        hasLedGlow: false,
        hasVipCrest: false
    };

    let savedConfigurations = [];

    // Helper: Show Alert Message using jQuery .fadeIn()
    function showAlert(message, type = "info") {
        const $alert = $("#status-alert");
        $alert.removeClass("alert-info alert-success alert-warning")
              .addClass("alert-" + type);
        $("#alert-text").text(message);
        $alert.stop(true, true).fadeIn(300);
    }

    // Helper: Recalculate & Update Price and Live Specs
    function updatePricingAndSpecs() {
        let total = configState.sizePrice + configState.premiumAddonPrice;

        // Animate price update with jQuery .text()
        const formattedPrice = "$" + total.toFixed(2);
        $("#total-price-display").text(formattedPrice);
        $("#sum-price").text(formattedPrice);

        // Update Spec Labels using jQuery .text()
        $("#sum-name").text(configState.name);
        $("#sum-color").text(configState.colorName);
        $("#sum-size").text(configState.selectedSize + " oz " + (configState.selectedSize === "12" ? "Compact" : (configState.selectedSize === "16" ? "Regular" : "Grand")));
        $("#sum-engraving").text(configState.engravingText.trim() ? configState.engravingText : "(None)");
        
        // Tags on Stage
        $("#tag-color").text("Color: " + configState.colorName);
        $("#tag-size").text("Capacity: " + configState.selectedSize + " oz");
        $("#tag-font").text("Font: " + (configState.fontStyle.charAt(0).toUpperCase() + configState.fontStyle.slice(1)));

        // Premium status description
        if (configState.isPremiumUnlocked) {
            let perks = [];
            if (configState.hasLedGlow) perks.push("LED Glow");
            if (configState.hasVipCrest) perks.push("VIP Crest");
            if (configState.colorKey === "gold") perks.push("Gold Coating");
            $("#sum-premium").text("Premium Edition " + (perks.length > 0 ? "(" + perks.join(", ") + ")" : ""));
        } else {
            $("#sum-premium").text("Standard Edition");
        }
    }

    // 2. Color Finish Selection using jQuery Click Event & DOM Manipulation
    $(".color-swatch").on("click", function () {
        const $swatch = $(this);

        // Check if locked
        if ($swatch.hasClass("locked")) {
            showAlert("The Gold Finish is exclusive to the Premium Pack! Click 'Complete Simulated Premium Purchase' below to unlock it.", "warning");
            return;
        }

        // Toggle active class on swatches
        $(".color-swatch").removeClass("active");
        $swatch.addClass("active");

        // Retrieve color data using jQuery .data()
        const colorKey = $swatch.data("color");
        const colorName = $swatch.attr("title") || colorKey;

        configState.colorKey = colorKey;
        configState.colorName = colorName;

        // Update 3D Product Canvas Classes
        const $model = $("#product-model");
        $model.removeClass("theme-midnight theme-pearl theme-ocean theme-emerald theme-gold")
              .addClass("theme-" + colorKey);

        showAlert("Color theme switched to " + colorName + ".", "info");
        updatePricingAndSpecs();
    });

    // 3. Size / Capacity Radio Change Event using jQuery
    $('input[name="product-size"]').on("change", function () {
        const $selectedRadio = $(this);
        const sizeVal = $selectedRadio.val();
        const priceVal = parseFloat($selectedRadio.data("price"));

        configState.selectedSize = sizeVal;
        configState.sizePrice = priceVal;

        // Update card highlight using jQuery .closest() and .addClass()
        $(".size-card").removeClass("active");
        $selectedRadio.closest(".size-card").addClass("active");

        // Scale Model dynamically on stage
        $("#product-model").removeClass("size-12 size-16 size-20")
                           .addClass("size-" + sizeVal);

        showAlert("Selected " + sizeVal + " oz capacity.", "info");
        updatePricingAndSpecs();
    });

    // 4. Custom Engraving Real-time Input Event & Character Count
    $("#engraving-text").on("input", function () {
        const enteredVal = $(this).val();
        const currentLen = enteredVal.length;
        const maxLen = $(this).attr("maxlength") || 18;

        configState.engravingText = enteredVal;

        // Update character counter with jQuery .text()
        $("#engraving-counter").text(currentLen + " / " + maxLen + " chars");

        // Real-time projection on the live product preview
        if (enteredVal.trim().length > 0) {
            $("#engraved-label").text(enteredVal.toUpperCase());
            $("#engraving-display").css("border-style", "solid");
        } else {
            $("#engraved-label").text("YOUR NAME");
            $("#engraving-display").css("border-style", "dashed");
        }

        updatePricingAndSpecs();
    });

    // 5. Engraving Font Style Switcher using jQuery
    $(".font-btn").on("click", function () {
        $(".font-btn").removeClass("active");
        $(this).addClass("active");

        const selectedFont = $(this).data("font");
        configState.fontStyle = selectedFont;

        // Apply font class to preview container
        $("#preview-stage").removeClass("font-modern font-serif font-mono")
                          .addClass("font-" + selectedFont);

        updatePricingAndSpecs();
    });

    // 6. Simulated Premium Purchase (Unlocks Gold Color, LED glow, VIP Crest)
    $("#btn-unlock-premium").on("click", function () {
        const $btn = $(this);
        $btn.prop("disabled", true).text("Processing Simulated Purchase...");

        // Simulate 500ms transaction delay
        setTimeout(function () {
            configState.isPremiumUnlocked = true;
            configState.premiumAddonPrice = 19.99;

            // Unlock the Gold Swatch
            $("#gold-swatch").removeClass("locked")
                             .attr("title", "24K Gold Coating (Unlocked)");

            // Switch to unlocked view with jQuery .slideDown()
            $("#premium-locked-view").slideUp(200, function () {
                $("#premium-unlocked-view").removeClass("hidden").slideDown(300);
            });

            // Update UI Badges
            $("#mode-badge").text("Premium Active ⭐")
                            .addClass("premium-mode");

            // Auto-check features
            $("#toggle-led-glow").prop("checked", true);
            configState.hasLedGlow = true;
            $("#led-ring").removeClass("hidden");
            $("#mug-rim").addClass("gold-rim");

            showAlert("Congratulations! Premium Customization Pack unlocked ($19.99 added).", "success");
            updatePricingAndSpecs();
        }, 500);
    });

    // Premium Toggles
    $("#toggle-led-glow").on("change", function () {
        configState.hasLedGlow = $(this).is(":checked");
        if (configState.hasLedGlow) {
            $("#led-ring").removeClass("hidden");
        } else {
            $("#led-ring").addClass("hidden");
        }
        updatePricingAndSpecs();
    });

    $("#toggle-vip-crest").on("change", function () {
        configState.hasVipCrest = $(this).is(":checked");
        if (configState.hasVipCrest) {
            $("#vip-crest").removeClass("hidden");
        } else {
            $("#vip-crest").addClass("hidden");
        }
        updatePricingAndSpecs();
    });

    // 7. Watch Promotional Teaser (Toggle Video Modal)
    $("#btn-toggle-video").on("click", function () {
        $("#promo-video-box").slideToggle(300);
    });

    $("#btn-close-video").on("click", function () {
        $("#promo-video-box").slideUp(200);
    });

    // 8. Close Alert Box
    $("#btn-close-alert").on("click", function () {
        $("#status-alert").fadeOut(200);
    });

    // 9. Save Configuration Form Submission using jQuery .submit()
    $("#configurator-form").on("submit", function (e) {
        e.preventDefault();

        // Build summary record
        const savedConfig = {
            id: Date.now(),
            color: configState.colorName,
            size: configState.selectedSize + " oz",
            engraving: configState.engravingText.trim() ? configState.engravingText : "None",
            premium: configState.isPremiumUnlocked ? "Yes (+$19.99)" : "No",
            price: "$" + (configState.sizePrice + configState.premiumAddonPrice).toFixed(2),
            timestamp: new Date().toLocaleTimeString()
        };

        savedConfigurations.push(savedConfig);

        // Update count with jQuery
        $("#saved-count").text(savedConfigurations.length);

        // Append new item card to saved list with jQuery .append()
        if (savedConfigurations.length === 1) {
            $("#saved-list").empty();
        }

        const newCardHtml = `
            <div class="saved-item-card" id="config-${savedConfig.id}">
                <div class="saved-item-info">
                    <strong>${savedConfig.color} (${savedConfig.size})</strong>
                    <div>Engraving: "${savedConfig.engraving}" • Premium: ${savedConfig.premium} • <small>${savedConfig.timestamp}</small></div>
                </div>
                <div class="saved-item-price">${savedConfig.price}</div>
            </div>
        `;

        $(newCardHtml).hide().appendTo("#saved-list").fadeIn(400);

        showAlert("Configuration saved successfully! Total saved items: " + savedConfigurations.length, "success");
    });

    // 10. Reset Form to Defaults
    $("#btn-reset-config").on("click", function () {
        // Reset state
        configState.colorKey = "midnight";
        configState.colorName = "Midnight Slate";
        configState.selectedSize = "12";
        configState.sizePrice = 79.99;
        configState.engravingText = "";
        configState.fontStyle = "modern";

        // Reset inputs with jQuery .val() and .prop()
        $("#engraving-text").val("");
        $("#engraving-counter").text("0 / 18 chars");
        $("#engraved-label").text("YOUR NAME");
        $("#engraving-display").css("border-style", "dashed");

        $('input[name="product-size"][value="12"]').prop("checked", true);
        $(".size-card").removeClass("active");
        $('input[name="product-size"][value="12"]').closest(".size-card").addClass("active");

        $(".color-swatch").removeClass("active");
        $('.color-swatch[data-color="midnight"]').addClass("active");

        $(".font-btn").removeClass("active");
        $('.font-btn[data-font="modern"]').addClass("active");

        $("#product-model").removeClass("theme-midnight theme-pearl theme-ocean theme-emerald theme-gold size-12 size-16 size-20")
                           .addClass("theme-midnight size-12");

        showAlert("Configurator restored to default values.", "info");
        updatePricingAndSpecs();
    });

    // Initial specs update
    updatePricingAndSpecs();
});
