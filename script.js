const sizeOptions = {
  "30": { id: "30", name: "Size 30", meta: "30 x 22 x 15 mm", price: 300 },
  "36": { id: "36", name: "Size 36", meta: "35 x 23 x 15 mm", price: 400 },
  "38": { id: "38", name: "Size 38", meta: "38 x 28 x 18 mm", price: 450 },
  "42": { id: "42", name: "Size 42", meta: "42 x 32 x 22 mm", price: 500 },
  "44": { id: "44", name: "Size 44", meta: "44 x 33 x 24 mm", price: 550 },
};

const layerOptions = {
  double: { id: "double", name: "Double Layer", meta: "Two-layer resin build", price: 0 },
  triple: { id: "triple", name: "Triple Layer", meta: "Three-layer resin build", price: 10 },
  four: { id: "four", name: "Four Layer", meta: "Four-layer resin build", price: 20 },
};

const styleOptions = {
  sticker: { id: "sticker", name: "Sticker Style", meta: "Flat sticker decoration", price: 0 },
  "fine-glitter": {
    id: "fine-glitter",
    name: "Fine Glitter Sticker Style",
    meta: "Sticker detail with fine shimmer",
    price: 50,
  },
  "single-accessory": {
    id: "single-accessory",
    name: "Single Accessory Style",
    meta: "One charm or accessory direction",
    price: 100,
  },
  "complex-accessory": {
    id: "complex-accessory",
    name: "Multi-layer Complex Accessory Style",
    meta: "Layered charms and complex accessory details",
    price: 150,
  },
};

const sizes = Object.values(sizeOptions);
const layers = Object.values(layerOptions);
const styles = Object.values(styleOptions);

const imageSets = {
  "1": {
    main: "image/1/%E4%B8%BB%E5%9B%BE.png",
    scenes: ["image/1/%E5%9C%BA%E6%99%AF%E5%9B%BE.jpg"],
    sides: ["image/1/%E4%BE%A7%E9%9D%A2.png"],
    details: [
      "image/1/%E7%BB%86%E8%8A%821.jpg",
      "image/1/%E7%BB%86%E8%8A%822.jpg",
      "image/1/%E7%BB%86%E8%8A%823.jpg",
    ],
  },
  "2": {
    main: "image/2/%E4%B8%BB%E5%9B%BE.png",
    scenes: ["image/2/%E5%9C%BA%E6%99%AF%E5%9B%BE.jpg"],
    sides: ["image/2/%E4%BE%A7%E9%9D%A2.png"],
    details: ["image/2/%E7%BB%86%E8%8A%821.jpg", "image/2/%E7%BB%86%E8%8A%822.jpg"],
  },
  "3": {
    main: "image/3/%E4%B8%BB%E5%9B%BE.png",
    scenes: ["image/3/%E5%9C%BA%E6%99%AF%E5%9B%BE.jpg"],
    sides: ["image/3/%E4%BE%A7%E9%9D%A2.png"],
    details: ["image/3/%E7%BB%86%E8%8A%82.jpg"],
  },
  "4": {
    main: "image/4/%E4%B8%BB%E5%9B%BE.png",
    scenes: ["image/4/%E5%9C%BA%E6%99%AF%E5%9B%BE.jpg"],
    sides: ["image/4/%E4%BE%A7%E9%9D%A2.png"],
    details: ["image/4/%E7%BB%86%E8%8A%821.jpg", "image/4/%E7%BB%86%E8%8A%822.jpg"],
  },
  "5": {
    main: "image/5/%E4%B8%BB%E5%9B%BE.png",
    scenes: ["image/5/%E5%9C%BA%E6%99%AF%E5%9B%BE1.jpg", "image/5/%E5%9C%BA%E6%99%AF%E5%9B%BE2.jpg"],
    sides: ["image/5/%E4%BE%A7%E9%9D%A2.png"],
    details: ["image/5/%E7%BB%86%E8%8A%821.jpg", "image/5/%E7%BB%86%E8%8A%822.jpg"],
  },
  "6": {
    main: "image/6/%E4%B8%BB%E5%9B%BE.png",
    scenes: ["image/6/%E5%9C%BA%E6%99%AF%E5%9B%BE1.jpg", "image/6/%E5%9C%BA%E6%99%AF%E5%9B%BE2.jpg"],
    sides: ["image/6/%E4%BE%A7%E9%9D%A2.png"],
    details: [
      "image/6/%E7%BB%86%E8%8A%82%E5%9B%BE.jpg",
      "image/6/%E7%BB%86%E8%8A%82%E5%9B%BE2.jpg",
      "image/6/%E7%BB%86%E8%8A%82%E5%9B%BE3.jpg",
    ],
  },
  "7": {
    main: "image/7/%E4%B8%BB%E5%9B%BE.png",
    scenes: ["image/7/%E5%9C%BA%E6%99%AF%E5%9B%BE.jpg"],
    sides: ["image/7/%E4%BE%A7%E9%9D%A2.png"],
    details: ["image/7/%E7%BB%86%E8%8A%82%E5%9B%BE.jpg", "image/7/%E7%BB%86%E8%8A%82%E5%9B%BE2.jpg"],
  },
  "8": {
    main: "image/8/%E4%B8%BB%E5%9B%BE.png",
    scenes: ["image/8/%E5%9C%BA%E6%99%AF%E5%9B%BE1.jpg", "image/8/%E5%9C%BA%E6%99%AF%E5%9B%BE2.jpg"],
    sides: ["image/8/%E4%BE%A7%E9%9D%A2.png"],
    details: ["image/8/%E7%BB%86%E8%8A%82%E5%9B%BE1.jpg", "image/8/%E7%BB%86%E8%8A%82%E5%9B%BE2.jpg"],
  },
  "9": {
    main: "image/9/%E4%B8%BB%E5%9B%BE.png",
    scenes: ["image/9/%E5%9C%BA%E6%99%AF%E5%9B%BE.jpg"],
    sides: ["image/9/%E4%BE%A7%E9%9D%A2.png"],
    details: ["image/9/%E7%BB%86%E8%8A%82.jpg"],
  },
  "10": {
    main: "image/10/%E4%B8%BB%E5%9B%BE.png",
    scenes: ["image/10/%E5%9C%BA%E6%99%AF%E5%9B%BE.jpg"],
    sides: ["image/10/%E4%BE%A7%E9%9D%A2.png"],
    details: ["image/10/%E7%BB%86%E8%8A%821.jpg", "image/10/%E7%BB%86%E8%8A%822.png"],
  },
};

const products = [
  {
    name: "Rabbit Candy Set",
    imageSetId: "7",
    image: imageSets["7"].main,
    sizeId: "30",
    layerId: "double",
    styleId: "complex-accessory",
    description: "Size 30 | Double Layer | Leather Mini Pearl Multi-layer Complex Accessory Style",
  },
  {
    name: "Crying Doll Set",
    imageSetId: "4",
    image: imageSets["4"].main,
    sizeId: "36",
    layerId: "triple",
    styleId: "sticker",
    description: "Size 36 | Triple Layer | Light Cartoon Pet Character Sticker Style",
  },
  {
    name: "Cartoon Character Set",
    imageSetId: "2",
    image: imageSets["2"].main,
    sizeId: "38",
    layerId: "four",
    styleId: "sticker",
    description: "Size 38 | Four Layer | Cartoon Sticker Style",
  },
  {
    name: "Wedding Gift Set",
    imageSetId: "8",
    image: imageSets["8"].main,
    sizeId: "38",
    layerId: "triple",
    styleId: "fine-glitter",
    description: "Size 38 | Triple Layer | Gold Foil Fine Glitter Sticker Style",
  },
  {
    name: "Pet Lover Set",
    imageSetId: "9",
    image: imageSets["9"].main,
    sizeId: "38",
    layerId: "triple",
    styleId: "sticker",
    description: "Size 38 | Triple Layer | Pet Character Sticker Style",
  },
  {
    name: "Purple Dream Set",
    imageSetId: "3",
    image: imageSets["3"].main,
    sizeId: "42",
    layerId: "triple",
    styleId: "complex-accessory",
    description: "Size 42 | Triple Layer | Gradient Gem Butterfly Multi-layer Complex Accessory Style",
  },
  {
    name: "Starry Sky Set",
    imageSetId: "6",
    image: imageSets["6"].main,
    sizeId: "42",
    layerId: "triple",
    styleId: "single-accessory",
    description: "Size 42 | Triple Layer | Black Base Sequin Starry Single Accessory Style",
  },
  {
    name: "American Anniversary Set",
    imageSetId: "10",
    image: imageSets["10"].main,
    sizeId: "42",
    layerId: "triple",
    styleId: "sticker",
    description: "Size 42 | Triple Layer | Dark Sticker Style",
  },
  {
    name: "Diamond Butterfly Set",
    imageSetId: "1",
    image: imageSets["1"].main,
    sizeId: "44",
    layerId: "double",
    styleId: "complex-accessory",
    description: "Size 44 | Double Layer | Leather Mini Pearl Butterfly Multi-layer Complex Accessory Style",
  },
  {
    name: "Pearl Set",
    imageSetId: "5",
    image: imageSets["5"].main,
    sizeId: "44",
    layerId: "double",
    styleId: "single-accessory",
    description: "Size 44 | Double Layer | Leather Mini Pearl Inlay Light Cartoon Sticker Accessory Style",
  },
];

let selectedSize = sizeOptions["30"];
let selectedLayer = layerOptions.double;
let selectedStyle = styleOptions.sticker;
let selectedProduct = "";

function formatUsd(value) {
  return `$${value.toLocaleString("en-US")}`;
}

function selectedTotal() {
  return selectedSize.price + selectedLayer.price + selectedStyle.price;
}

function productMatchesSelection(product) {
  return (
    product.name === selectedProduct ||
    (product.sizeId === selectedSize.id &&
      product.layerId === selectedLayer.id &&
      product.styleId === selectedStyle.id)
  );
}

function renderProducts() {
  const grid = document.querySelector("#product-grid");
  grid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card ${productMatchesSelection(product) ? "is-selected" : ""}">
          <button class="product-image-button product-detail-button" type="button" data-product="${product.name}" aria-label="View ${product.name} details">
            <img src="${product.image}" alt="${product.name} custom resin mahjong design reference" loading="lazy">
          </button>
          <div class="product-body">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-actions">
              <button class="text-link product-detail-button" type="button" data-product="${product.name}">View details</button>
              <button class="text-link product-inquiry-button" type="button" data-product="${product.name}">Use this design</button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function optionButton(option, selected, type) {
  const price = option.price === 0 ? "+$0" : type === "size" ? formatUsd(option.price) : `+${formatUsd(option.price)}`;
  return `
    <button class="option-card" type="button" aria-pressed="${option.id === selected.id}" data-type="${type}" data-id="${option.id}">
      <span class="option-radio" aria-hidden="true"></span>
      <span>
        <span class="option-name">${option.name}</span>
        <span class="option-meta">${option.meta}</span>
      </span>
      <span class="option-price">${price}</span>
    </button>
  `;
}

function renderOptions() {
  document.querySelector("#size-options").innerHTML = sizes
    .map((size) => optionButton(size, selectedSize, "size"))
    .join("");
  document.querySelector("#layer-options").innerHTML = layers
    .map((layer) => optionButton(layer, selectedLayer, "layer"))
    .join("");
  document.querySelector("#style-options").innerHTML = styles
    .map((style) => optionButton(style, selectedStyle, "style"))
    .join("");
}

function updateEstimate() {
  document.querySelector("#estimate-title").textContent = formatUsd(selectedTotal());
  document.querySelector(
    "#selected-size",
  ).textContent = `${selectedSize.name.replace("Size ", "")} | ${selectedSize.meta}`;
  document.querySelector("#selected-layer").textContent = selectedLayer.name;
  document.querySelector("#selected-style").textContent = selectedStyle.name;
  updateFormSummary();
}

function updateFormSummary() {
  document.querySelector("#product-reference").value = selectedProduct;
  document.querySelector("#summary-product").textContent =
    selectedProduct || "No specific design selected";
  document.querySelector("#summary-size").textContent = `${selectedSize.name} | ${selectedSize.meta}`;
  document.querySelector("#summary-layer").textContent = selectedLayer.name;
  document.querySelector("#summary-style").textContent = selectedStyle.name;
  document.querySelector("#summary-total").textContent = `${formatUsd(selectedTotal())} before shipping`;
}

function setStatus(message, type = "") {
  const status = document.querySelector("#form-status");
  status.textContent = message;
  status.dataset.type = type;
}

function localApiFallbackUrl() {
  const isLocalHost = ["127.0.0.1", "localhost"].includes(window.location.hostname);
  if (!isLocalHost || window.location.port === "3000") return null;
  return "http://127.0.0.1:3000/api/inquiry";
}

async function submitInquiry(payload) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  const response = await fetch("/api/inquiry", request);
  const fallbackUrl = localApiFallbackUrl();

  if (response.status === 404 && fallbackUrl) {
    return fetch(fallbackUrl, request);
  }

  return response;
}

function selectProduct(product) {
  selectedProduct = product.name;
  selectedSize = sizeOptions[product.sizeId];
  selectedLayer = layerOptions[product.layerId];
  selectedStyle = styleOptions[product.styleId];
  renderOptions();
  updateEstimate();
  renderProducts();
}

function renderThumbs(container, images, productName) {
  container.innerHTML = images
    .map(
      (image, index) => `
        <button class="detail-thumb" type="button" data-image="${image}" aria-label="View ${productName} image ${index + 1}">
          <img src="${image}" alt="${productName} thumbnail ${index + 1}" loading="lazy">
        </button>
      `,
    )
    .join("");
}

function setDetailImage(image, productName) {
  const mainImage = document.querySelector("#detail-main-image");
  mainImage.src = image;
  mainImage.alt = `${productName} product detail image`;

  document.querySelectorAll(".detail-thumb").forEach((thumb) => {
    thumb.classList.toggle("is-active", thumb.dataset.image === image);
  });
}

function openProductDetail(product) {
  const imageSet = imageSets[product.imageSetId];
  const modal = document.querySelector("#detail-modal");

  document.querySelector("#detail-title").textContent = product.name;
  document.querySelector("#detail-description").textContent = product.description;
  document.querySelector("#detail-use-design").dataset.product = product.name;
  renderThumbs(document.querySelector("#detail-main-thumbs"), [imageSet.main], product.name);
  renderThumbs(document.querySelector("#detail-scene-thumbs"), imageSet.scenes, product.name);
  renderThumbs(document.querySelector("#detail-side-thumbs"), imageSet.sides, product.name);
  renderThumbs(document.querySelector("#detail-detail-thumbs"), imageSet.details, product.name);
  setDetailImage(imageSet.main, product.name);

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProductDetail() {
  const modal = document.querySelector("#detail-modal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function bindOptions() {
  document.addEventListener("click", (event) => {
    const option = event.target.closest(".option-card");
    if (option) {
      if (option.dataset.type === "size") {
        selectedSize = sizes.find((size) => size.id === option.dataset.id);
      } else if (option.dataset.type === "layer") {
        selectedLayer = layers.find((layer) => layer.id === option.dataset.id);
      } else {
        selectedStyle = styles.find((style) => style.id === option.dataset.id);
      }

      selectedProduct = "";
      renderOptions();
      updateEstimate();
      renderProducts();
      return;
    }

    const productButton = event.target.closest(".product-inquiry-button");
    if (productButton) {
      const product = products.find((item) => item.name === productButton.dataset.product);
      if (!product) return;

      selectProduct(product);
      closeProductDetail();
      document.querySelector("#inquiry-form").scrollIntoView({ behavior: "smooth", block: "center" });
      document.querySelector("#customer-message").focus({ preventScroll: true });
      return;
    }

    const detailButton = event.target.closest(".product-detail-button");
    if (detailButton) {
      const product = products.find((item) => item.name === detailButton.dataset.product);
      if (!product) return;

      openProductDetail(product);
      return;
    }

    const thumbButton = event.target.closest(".detail-thumb");
    if (thumbButton) {
      const title = document.querySelector("#detail-title").textContent;
      setDetailImage(thumbButton.dataset.image, title);
      return;
    }

    if (event.target.closest("[data-close-detail]")) {
      closeProductDetail();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProductDetail();
  });
}

function bindForm() {
  const form = document.querySelector("#inquiry-form");
  const submitButton = document.querySelector("#submit-inquiry");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus("");
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const payload = {
      name: document.querySelector("#customer-name").value.trim(),
      email: document.querySelector("#customer-email").value.trim(),
      message: document.querySelector("#customer-message").value.trim(),
      productReference: selectedProduct,
      size: selectedSize,
      layer: selectedLayer,
      style: selectedStyle,
      estimatedTotal: selectedTotal(),
    };

    try {
      const response = await submitInquiry(payload);
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Submission failed. Please try again.");
      }

      form.reset();
      selectedProduct = "";
      renderProducts();
      updateFormSummary();
      setStatus("Thank you. Your inquiry was sent successfully.", "success");
    } catch (error) {
      setStatus(error.message || "Submission failed. Please try again.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit inquiry";
    }
  });
}

renderProducts();
renderOptions();
updateEstimate();
bindOptions();
bindForm();
