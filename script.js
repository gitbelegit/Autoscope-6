// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const moonIcon = document.getElementById('moon-icon');
const body = document.body;

// Check for saved theme preference in localStorage
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
    moonIcon.classList.replace('fa-moon', 'fa-sun'); // Change moon icon to sun in dark mode
    console.log('Dark mode applied from localStorage'); // Debugging line
} else {
    console.log('Light mode applied'); // Debugging line
}

// Toggle dark mode on and off
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', darkModeToggle.checked);
    moonIcon.classList.toggle('fa-moon', !darkModeToggle.checked);
    moonIcon.classList.toggle('fa-sun', darkModeToggle.checked);
    // Save the user's preference to localStorage
    localStorage.setItem('dark-mode', darkModeToggle.checked ? 'enabled' : 'disabled');
    console.log(`Dark mode is now ${darkModeToggle.checked ? 'enabled' : 'disabled'}`); // Debugging line
});

// Expanded price estimates based on part name (using your original parts)
const partPrices = {
    // Engine Parts
    'engine block': 20000,
    'cylinder head': 12000,
    'piston': 3000,
    'timing belt': 1500,
    'valve': 1000,
    'crankshaft': 10000,
    'camshaft': 8000,
    'spark plug': 300,
    // Other parts
    'brake disc': 3500,
    'brake pads': 800,
    'headlight': 1000,
    'tail light': 800,
    'radiator': 4500,
    'car battery': 3000,
    'alternator': 6000,
    'starter motor': 5000,
    'clutch plate': 2500,
    'gearbox': 15000,
    'air filter': 500,
    'fuel filter': 400,
    'oil filter': 200,
    'timing chain': 1800,
    'serpentine belt': 1000,
    'water pump': 2500,
    'wiper blades': 400,
    'windshield': 5000,
    'exhaust pipe': 3500,
    'catalytic converter': 8000,
    'power steering pump': 4000,
    'steering rack': 12000,
    'suspension arm': 6000,
    'shock absorber': 1500,
    'wheel hub': 2000,
    'wheel rim': 2500,
    'tire': 3500,
    'car door': 8000,
    'side mirror': 1000,
    'window regulator': 1500,
    'door handle': 500,
    'bumper': 4000,
    'fender': 2500,
    'quarter panel': 3000,
    'roof panel': 4000,
    'chassis': 15000,
    'brake caliper': 4000,
    'brake master cylinder': 3500,
    'clutch master cylinder': 3000,
    'fuel tank': 7000,
    'fuel pump': 2000,
    'fuel injector': 1000,
    'oil pump': 1500,
    'timing gear': 1000,
    'cam gear': 800,
    'flywheel': 2500,
    'differential': 7000,
    'axle shaft': 5000,
    'driveshaft': 4000,
    'wheel bearing': 1500,
    'battery terminal': 500,
    'spark plug wire': 300,
    'coil pack': 1200,
    'head gasket': 2000,
    'intake manifold': 4000,
    'exhaust manifold': 3000,
    'oil pan': 1000,
    'timing cover': 1500,
    'piston rings': 800,
    'connecting rod': 2000,
    'oil cooler': 2500,
    'radiator fan': 1500,
    'condenser': 2000,
    'compressor': 5000,
    'alternator belt': 800,
    'AC compressor': 7000,
    'shock absorber mount': 1500,
    'sway bar': 1000,
    'sway bar link': 500,
    'control arm': 2500,
    'tie rod': 1000,
    'ball joint': 800,
    'strut mount': 1000,
    'hub assembly': 3000,
    'brake drum': 2000,
    'clutch disc': 1500,
    'clutch release bearing': 1000,
    'flywheel ring gear': 500,
    'timing belt tensioner': 1500,
    'oil cooler line': 800,
    'radiator hose': 400,
    'exhaust gasket': 500,
    'headlight bulb': 300,
    'fog light bulb': 200,
    'tail light bulb': 150,
    'turn signal bulb': 100,
    'brake light bulb': 250,
    'fuse': 50,
    'sensor': 1200,
    'ABS sensor': 2000,
    'oxygen sensor': 1800,
    'crankshaft position sensor': 2500,
    'camshaft position sensor': 2000,
    'knock sensor': 1500,
    'wheel speed sensor': 1200,
    'mass air flow sensor': 3500,
    'throttle position sensor': 2500,
    'fuel pressure regulator': 1500,
    'temperature sensor': 800,
    'oil pressure sensor': 1000,
    'speedometer': 2000,
    'tachometer': 2500,
    'odometer': 3000
};

// Estimate the price based on part name
function estimatePartPrice(partName) {
    partName = partName.toLowerCase().trim();
    return partPrices[partName] || 'Part not found'; // Return 'Part not found' if part isn't in the list
}

// Form submission handler
const form = document.getElementById('estimate-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const partNameInput = document.getElementById('part-name');
    const partName = partNameInput.value.trim();
    
    // Debugging line to see the entered part name
    console.log(`Entered part name: ${partName}`);

    // Validate input (check if empty)
    if (!partName) {
        alert("Please enter a valid part name.");
        return; // Don't proceed if input is empty
    }

    // Estimate price
    const estimatedPrice = estimatePartPrice(partName);
    
    // Display result
    const priceDisplay = document.getElementById('price');
    const loadingIcon = document.getElementById('loading-icon');
    
    loadingIcon.style.display = 'block'; // Show the loading icon
    priceDisplay.textContent = ''; // Reset the price text while calculating

    setTimeout(() => {
        loadingIcon.style.display = 'none'; // Hide the loading icon
        if (typeof estimatedPrice === 'number') {
            priceDisplay.textContent = `₹${estimatedPrice.toLocaleString()}`; // Show the price with formatting
        } else {
            priceDisplay.textContent = `Error: ${estimatedPrice}`; // Show error message
        }
    }, 1500);
    
    // Keep the part name in the input field (no clearing)
    partNameInput.value = partName;
});

// Image preview functionality
const fileInput = document.getElementById("part-image");
const previewContainer = document.createElement("div");
previewContainer.classList.add("image-preview");
fileInput.parentElement.appendChild(previewContainer);

fileInput.addEventListener("change", function () {
    console.log("Image input changed"); // Debugging line to check image input change
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            previewContainer.innerHTML = ""; // Clear previous preview
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

// Additional feature: Clear the input and preview on reset
const resetButton = document.getElementById('reset-btn');
resetButton.addEventListener('click', function() {
    console.log("Reset button clicked"); // Debugging line to check reset button action
    const partNameInput = document.getElementById('part-name');
    const priceDisplay = document.getElementById('price');
    const previewContainer = document.querySelector('.image-preview');

    partNameInput.value = '';
    priceDisplay.textContent = '₹0';
    previewContainer.innerHTML = ''; // Clear image preview
});
