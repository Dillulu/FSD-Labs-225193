/**
 * Full Stack Development (CS-301L) - Lab 05
 * Student Name: Hamza Tahir
 * Registration ID: 225193
 * 
 * Question 2: Public Product API Integration using jQuery AJAX GET
 * Demonstrates:
 * - Asynchronous jQuery AJAX GET request to a public REST API (DummyJSON)
 * - Handling query parameters (limit, category)
 * - Processing JSON response containing product attributes (title, price, category, thumbnail, description)
 * - Dynamic webpage rendering using jQuery ($.each, .append, .empty, .text, .attr)
 * - Transferring external API product data directly into the Interactive Configurator
 * - Complete Error Handling (network failure, 404, simulated invalid endpoints)
 * - Observable request/response in Browser Developer Tools Console & Network Tab
 */

$(document).ready(function () {
    console.log("=== Question 2: Public Product API Initialized ===");
    console.log("Student: Hamza Tahir (225193)");

    let fetchedProducts = [];
    let selectedProduct = null;
    let customAddonPrice = 0;

    // Helper: Update Telemetry Status Banner
    function setStatus(type, message) {
        const $banner = $("#api-status-banner");
        $banner.removeClass("idle loading success error")
               .addClass(type);
        $("#status-message").text(message);
        $("#status-timestamp").text(new Date().toLocaleTimeString());
    }

    // Helper: Update Active Endpoint Display
    function updateEndpointUrl() {
        const limit = $("#api-limit-select").val();
        const category = $("#api-category-select").val();
        let url = `https://dummyjson.com/products`;

        if (category !== "all") {
            url += `/category/${category}`;
        }
        url += `?limit=${limit}`;

        $("#active-url").text(url);
        return url;
    }

    // Listen to filter changes
    $("#api-limit-select, #api-category-select").on("change", function () {
        updateEndpointUrl();
    });

    // 1. Core jQuery AJAX GET Request
    function fetchPublicProducts(requestUrl) {
        setStatus("loading", "Dispatching HTTP GET request to: " + requestUrl + " ...");
        $("#btn-fetch-api").prop("disabled", true);
        $("#btn-icon").text("⏳");

        console.log("%c[AJAX GET Initiated]", "color: #2563eb; font-weight: bold;", requestUrl);

        $.ajax({
            url: requestUrl,
            method: "GET",
            dataType: "json",
            timeout: 10000,
            success: function (response) {
                console.log("%c[AJAX 200 OK Response]", "color: #16a34a; font-weight: bold;", response);

                fetchedProducts = response.products || [];
                renderCatalog(fetchedProducts);

                setStatus("success", `Successfully retrieved ${fetchedProducts.length} products from public API (Status: 200 OK).`);
                $("#catalog-count").text(`${fetchedProducts.length} items loaded`);

                // Update Raw JSON Inspector
                $("#json-viewer").text(JSON.stringify(response, null, 2));

                $("#btn-fetch-api").prop("disabled", false);
                $("#btn-icon").text("⚡");
            },
            error: function (xhr, status, error) {
                console.error("%c[AJAX GET Error]", "color: #dc2626; font-weight: bold;", {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    error: error,
                    response: xhr.responseText
                });

                const errorMsg = xhr.status 
                    ? `API Request Failed! HTTP Status ${xhr.status}: ${xhr.statusText}`
                    : `Network Error: Could not reach public API. Check internet connection.`;

                setStatus("error", errorMsg);
                $("#catalog-products-container").html(`
                    <div class="catalog-placeholder" style="border-color: #fca5a5; background: #fff5f5;">
                        <div class="placeholder-icon">⚠️</div>
                        <p style="color: #b91c1c; font-weight: 700;">Request Error (${xhr.status || 'Offline'})</p>
                        <small style="color: #7f1d1d;">${errorMsg}. Please inspect the browser DevTools Network tab for details.</small>
                    </div>
                `);

                $("#json-viewer").text(JSON.stringify({
                    error: error,
                    status: xhr.status,
                    statusText: xhr.statusText,
                    responseText: xhr.responseText || "No response received"
                }, null, 2));

                $("#btn-fetch-api").prop("disabled", false);
                $("#btn-icon").text("⚡");
            }
        });
    }

    // 2. Render Products from Public API into the Catalog Grid using jQuery
    function renderCatalog(products) {
        const $container = $("#catalog-products-container");
        $container.empty();

        if (products.length === 0) {
            $container.html(`
                <div class="catalog-placeholder">
                    <p>No products returned for this category.</p>
                </div>
            `);
            return;
        }

        // Iterate through products with jQuery $.each
        $.each(products, function (index, product) {
            const thumbnail = product.thumbnail || (product.images && product.images[0]) || "https://dummyjson.com/image/200x150";
            const productCard = `
                <div class="catalog-item-card" data-id="${product.id}">
                    <div class="card-img-wrap">
                        <img src="${thumbnail}" alt="${product.title}" loading="lazy">
                    </div>
                    <div class="card-body">
                        <span class="card-cat">${product.category}</span>
                        <h4 class="card-title">${product.title}</h4>
                        <p class="card-desc">${product.description}</p>
                        <div class="card-foot">
                            <span class="card-price">$${product.price.toFixed(2)}</span>
                            <button type="button" class="btn-select-prod" data-id="${product.id}">
                                Configure Item &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            `;

            $container.append(productCard);
        });
    }

    // 3. Button Click Event: Trigger AJAX GET
    $("#btn-fetch-api").on("click", function () {
        const targetUrl = updateEndpointUrl();
        fetchPublicProducts(targetUrl);
    });

    // 4. Simulate API Error Button Click Event
    $("#btn-simulate-error").on("click", function () {
        const badUrl = "https://dummyjson.com/non-existent-api-endpoint-404";
        $("#active-url").text(badUrl);
        fetchPublicProducts(badUrl);
    });

    // 5. Transfer Selected Public API Product into Configurator
    $(document).on("click", ".btn-select-prod", function () {
        const prodId = $(this).data("id");
        selectedProduct = fetchedProducts.find(p => p.id === prodId);

        if (!selectedProduct) return;

        console.log("Configuring item loaded from external API:", selectedProduct);

        // Update Configurator UI using jQuery DOM manipulation
        $("#source-badge").text("Imported from API (ID: " + selectedProduct.id + ")")
                          .css("background", "#dcfce7")
                          .css("color", "#15803d");

        const thumbnail = selectedProduct.thumbnail || selectedProduct.images[0];
        $("#configured-img").attr("src", thumbnail)
                            .attr("alt", selectedProduct.title);

        $("#conf-category").text(selectedProduct.category.toUpperCase());
        $("#conf-price").text("$" + selectedProduct.price.toFixed(2));
        $("#conf-title").text(selectedProduct.title);
        $("#conf-desc").text(selectedProduct.description);

        // Update Summary
        $("#summary-base-price").text("$" + selectedProduct.price.toFixed(2));
        updateOrderTotal();

        // Enable order button
        $("#btn-confirm-order").prop("disabled", false);

        // Scroll to configurator if on mobile
        $("html, body").animate({
            scrollTop: $("#target-product-view").offset().top - 80
        }, 400);

        setStatus("success", `Loaded "${selectedProduct.title}" into Configurator.`);
    });

    // 6. Customization Form: Live Engraving & Addons on API Product
    $("#btn-apply-custom").on("click", function () {
        const customText = $("#conf-engraving-input").val().trim();
        const $badge = $("#live-engraving-badge");

        if (customText) {
            $badge.text("Laser Engraved: " + customText).fadeIn(200);
            setStatus("info", `Custom engraving "${customText}" applied to item.`);
        } else {
            $badge.fadeOut(200);
        }
    });

    // Gift wrap checkbox
    $("#conf-gift-wrap").on("change", function () {
        customAddonPrice = $(this).is(":checked") ? 5.00 : 0.00;
        $("#summary-addon-price").text("$" + customAddonPrice.toFixed(2));
        updateOrderTotal();
    });

    function updateOrderTotal() {
        if (!selectedProduct) return;
        const total = selectedProduct.price + customAddonPrice;
        $("#summary-final-total").text("$" + total.toFixed(2));
    }

    // 7. Confirm Order Action
    $("#btn-confirm-order").on("click", function () {
        if (!selectedProduct) return;
        const engraving = $("#conf-engraving-input").val().trim();
        const giftWrap = $("#conf-gift-wrap").is(":checked") ? "Yes" : "No";

        alert(
            `=== Order Confirmed ===\n` +
            `Product: ${selectedProduct.title}\n` +
            `Category: ${selectedProduct.category}\n` +
            `Price: $${selectedProduct.price.toFixed(2)}\n` +
            `Custom Engraving: ${engraving || "None"}\n` +
            `Luxury Packaging: ${giftWrap}\n` +
            `Total: ${$("#summary-final-total").text()}\n\n` +
            `Student: Hamza Tahir (225193)\n` +
            `Successfully demonstrated jQuery AJAX GET request & Dynamic DOM binding!`
        );
    });

    // 8. Toggle Raw JSON response display
    $("#btn-toggle-json").on("click", function () {
        $("#json-viewer").toggleClass("hidden");
    });

    // Auto-fetch 6 products on page load for immediate demonstration
    updateEndpointUrl();
    fetchPublicProducts("https://dummyjson.com/products?limit=6");
});
