function loginUser() {
    var username = prompt("Enter your username:");
    var password = prompt("Enter your password:");

    // AJAX request to login
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "process.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
                alert("Login successful!");
                showElement("movieOptions");
            } else {
                alert(response.message);
            }
        }
    };
    xhr.send("action=login&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
}

function registerUser() {
    var username = prompt("Enter a new username:");
    var password = prompt("Enter a new password:");

    // AJAX request to register
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "process.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
                alert("Registration successful!");
            } else {
                alert(response.message);
            }
        }
    };
    xhr.send("action=register&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
}


function makePayment() {
    var paymentChoice = document.getElementById("paymentChoice").value;
    if (paymentChoice.toLowerCase() === 'y') {
        // Simulate payment (no actual transaction, just a message)
        alert("Payment successful!");
        showElement("ticketDetails");
    } else {
        alert("Payment cancelled!");
    }
}


function showSelectedMovie() {
    var selectedMovie = document.getElementById("movieSelect").value;
    document.getElementById("selectedMovie").innerText = "Selected Movie: " + selectedMovie;
    showElement("movieSelection");
}

var seats = [];
var selectedSeats = [];

// Initialize seats
for (var i = 1; i <= 40; i++) {
    seats.push(i);
    selectedSeats.push(false);
}

function showSelectedSeats() {
    var seatMapContainer = document.getElementById("seatMap");
    seatMapContainer.innerHTML = "";

    for (var i = 0; i < seats.length; i++) {
        var seatElement = document.createElement("div");
        seatElement.className = "seat" + (selectedSeats[i] ? " selected" : "");
        seatElement.innerText = seats[i];
        seatElement.setAttribute("data-seat-number", seats[i]);
        seatElement.onclick = function() {
            toggleSeatSelection(this);
        };

        seatMapContainer.appendChild(seatElement);
    }

    updateSelectedSeatsList();
    showElement("selectedSeats");
}

function toggleSeatSelection(seatElement) {
    var seatNumber = parseInt(seatElement.getAttribute("data-seat-number"));

    // Toggle seat selection
    selectedSeats[seatNumber - 1] = !selectedSeats[seatNumber - 1];
    seatElement.classList.toggle("selected");

    // Update selected seats list and total price
    updateSelectedSeatsList();
}

function updateSelectedSeatsList() {
    var selectedSeatsList = [];
    var totalPrice = 0;

    for (var i = 0; i < selectedSeats.length; i++) {
        if (selectedSeats[i]) {
            selectedSeatsList.push(seats[i]);
            totalPrice += 185; // Assuming each seat costs $185
        }
    }

    document.getElementById("selectedSeatsList").innerText = "Selected Seats: " + selectedSeatsList.join(", ");
    document.getElementById("totalPrice").innerText = totalPrice;
}

function showPayment() {
    showElement("payment");
}

function showTicketDetails() {
    var paymentChoice = document.getElementById("paymentChoice").value;
    if (paymentChoice.toLowerCase() === 'y') {
        var selectedMovie = document.getElementById("selectedMovie").innerText;
        var selectedSeats = document.getElementById("selectedSeatsList").innerText;
        var totalPrice = document.getElementById("totalPrice").innerText;

        document.getElementById("ticketContent").innerText =
            selectedMovie + "\n" + "Selected Seats: " + selectedSeats + "\nTotal Price: $" + totalPrice;
        showElement("ticketDetails");
    } else {
        alert("Payment cancelled!");
    }
}

function printTicket() {
    // Display ticket details on the screen
    var selectedMovie = document.getElementById("selectedMovie").innerText;
    var selectedSeats = document.getElementById("selectedSeatsList").innerText;
    var totalPrice = document.getElementById("totalPrice").innerText;

    
    var ticketDetails =  selectedMovie +
                        "\n" + selectedSeats +
                        "\nTotal Price: Rs." + totalPrice;

    document.getElementById("ticketContent").innerText = ticketDetails;

    // Simulate printing by showing an alert (you can replace this with actual print logic)
}

function showElement(elementId) {
    // Hide all elements
    var elements = ["loginOptions", "movieOptions", "movieSelection", "selectedSeats", "payment", "ticketDetails"];
    for (var i = 0; i < elements.length; i++) {
        document.getElementById(elements[i]).style.display = "none";
    }

    // Show the specified element
    document.getElementById(elementId).style.display = "block";
}