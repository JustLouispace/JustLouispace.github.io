    // Set to store unique pairs of numbers
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
            document.getElementById("result").textContent = "All pairs have been used!";
            document.getElementById("attempts").textContent = `Attempts: ${attemptCount}`;
            document.getElementById("randomButton").disabled = true; // Disable the button
            document.getElementById("randomButton").style.backgroundColor = "gray"; // Change button color to gray
            return;
        }
    
        // Add the unique pair to the set and display the result
        usedPairs.add(pairKey);
        attemptCount += 1;  // Increment by 1 for each attempt
        let resultText = `${a} × ${b} = ${a * b}`;
        document.getElementById("result").textContent = resultText;
    
        // Update attempts count
        document.getElementById("attempts").textContent = `Attempts: ${attemptCount}`;
    
        // Add to history with numbering
        let listItem = document.createElement("li");
        listItem.textContent = `${historyIndex}. ${resultText}`;
        document.getElementById("historyList").appendChild(listItem);
        historyIndex++;
    }

    function clearResults() {
        usedPairs.clear();
        attemptCount = 0;
        historyIndex = 1;  // Reset history numbering
        document.getElementById("result").textContent = "";
        document.getElementById("historyList").innerHTML = "";
        document.getElementById("attempts").textContent = "Attempts: 0";
        document.getElementById("randomButton").disabled = false;  // Enable the button again
        document.getElementById("randomButton").style.backgroundColor = "#4CAF50"; // Reset button color
    }