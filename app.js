let usedPairs = new Set();
let attemptCount = 0;
let historyIndex = 1;

function generateRandomNumbers() {
    let a, b, pairKey;

    // Loop until we get a unique pair
    do {
        a = Math.floor(Math.random() * 9) + 1;
        b = Math.floor(Math.random() * 9) + 1;
        pairKey = `${Math.min(a, b)},${Math.max(a, b)}`;
    } while (usedPairs.has(pairKey) && usedPairs.size < 45);

    // Check if all unique pairs are used
    if (usedPairs.size >= 45) {
        showResult("All pairs have been used!");
        document.getElementById("attempts").textContent = `Attempts: ${attemptCount}`;
        document.getElementById("randomButton").disabled = true; // Disable the button
        document.getElementById("randomButton").style.backgroundColor = "gray"; // Change button color to gray
        return;
    }

    // Add the unique pair to the set and display the result
    usedPairs.add(pairKey);
    attemptCount += 1;
    let resultText = `${a} × ${b} = ${a * b}`;
    showResult(resultText);

    // Update attempts count with animation
    updateAttempts();

    // Add to history with animation
    addToHistory(resultText);
}

// Function to show result with animation
function showResult(text) {
    const resultDiv = document.getElementById("result");
    resultDiv.classList.add("animate");  // Trigger CSS animation
    setTimeout(() => {
        resultDiv.textContent = text;
        resultDiv.classList.remove("animate");
    }, 300);  // Duration matches the CSS transition time
}

// Function to update attempts count with animation
function updateAttempts() {
    const attemptCountSpan = document.getElementById("attemptCount");
    
    // Remove the animation class if it already exists to reset the animation
    attemptCountSpan.classList.remove("animate");
    
    // Update the text content
    attemptCountSpan.textContent = attemptCount;
    
    // Trigger reflow to restart the animation
    void attemptCountSpan.offsetWidth;
    
    // Add the animation class to trigger the animation
    attemptCountSpan.classList.add("animate");
}

// Function to add history items with animation
function addToHistory(resultText) {
    // Create a new list item with the animated effect
    let listItem = document.createElement("li");
    listItem.textContent = `${historyIndex}. ${resultText}`;
    
    // Append the new list item to the history list
    document.getElementById("historyList").appendChild(listItem);
    
    // Optional: Scroll to the bottom smoothly
    const historyList = document.getElementById("historyList");
    historyList.scrollTo({
        top: historyList.scrollHeight,
        behavior: "smooth"
    });
    
    historyIndex++;
}

function clearResults() {
    usedPairs.clear();
    attemptCount = 0;
    historyIndex = 1;
    document.getElementById("result").textContent = "";
    document.getElementById("historyList").innerHTML = "";
    document.getElementById("attempts").textContent = "Attempts: 0";
    document.getElementById("randomButton").disabled = false;  // Enable the button again
    document.getElementById("randomButton").style.backgroundColor = "#4CAF50"; // Reset button color
}

// Function to create a falling sakura petal
function createSakuraPetal() {
    const petal = document.createElement('div');
    petal.classList.add('sakura-fall');
    
    // Randomize position and animation duration
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${7 + Math.random() * 6}s`; // Duration between 5-10 seconds
    
    // Append petal to body
    document.body.appendChild(petal);
    
    // Remove petal after animation completes
    petal.addEventListener('animationend', () => {
        petal.remove();
    });
}

// Generate petals at intervals
setInterval(createSakuraPetal, 1500); // Add a new petal every 500ms