document.addEventListener("DOMContentLoaded", function () {

  //play-pause function
  const audio = document.getElementById("audio-player");
  const playButtons = document.querySelectorAll(".play-btn");
  
  let currentButton = null;
  let updateTimeInterval = null;
  
  playButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const songSrc = button.getAttribute("data-src"); // ✅ gets the song URL
      const icon = button.querySelector("i"); // ✅ gets the play/pause icon
      const timeDisplay = button.closest(".item").querySelector(".time-display"); // ✅ shows time
  
      if (currentButton === button && !audio.paused) {
        // ✅ if same button clicked again and audio is playing, pause it
        audio.pause();
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
        clearInterval(updateTimeInterval);
      } else {
        // ✅ Pause previous audio and reset
        if (currentButton) {
          const prevIcon = currentButton.querySelector("i");
          prevIcon.classList.remove("fa-pause");
          prevIcon.classList.add("fa-play");
  
          const prevTime = currentButton.closest(".item").querySelector(".time-display");
          if (prevTime) prevTime.textContent = "00:00";
        }
  
        // ✅ Play new audio
        audio.src = songSrc;
  
        // ✅ This is good — adding catch will help in debugging
        audio.play().then(() => {
          icon.classList.remove("fa-play");
          icon.classList.add("fa-pause");
          currentButton = button;
  
          updateTimeInterval = setInterval(() => {
            const minutes = Math.floor(audio.currentTime / 60).toString().padStart(2, '0');
            const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
            timeDisplay.textContent = `${minutes}:${seconds}`;
          }, 1000);
        }).catch(err => {
          console.error("Error playing audio:", err);
        });
      }
    });
  });
  
  // ✅ Reset when audio ends
  audio.addEventListener("ended", () => {
    if (currentButton) {
      const icon = currentButton.querySelector("i");
      icon.classList.remove("fa-pause");
      icon.classList.add("fa-play");
  
      const timeDisplay = currentButton.closest(".item").querySelector(".time-display");
      if (timeDisplay) timeDisplay.textContent = "00:00";
  
      currentButton = null;
      clearInterval(updateTimeInterval);
    }
  });
  


  

  // 🔍 Search Functionality
  let searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      let searchValue = this.value.toLowerCase().trim();

      document.querySelectorAll(".spotify-playlist .item").forEach((item) => {
        let title = item.querySelector("h4")?.textContent.toLowerCase() || "";
        let artist = item.querySelector("p")?.textContent.toLowerCase() || "";

        if (title.includes(searchValue) || artist.includes(searchValue)) {
          item.style.display = "flex"; // Adjust based on layout (grid/flex)
        } else {
          item.style.display = "none";
        }
      });
    });
  }
});

//login signup function
// Open & Close Modals
function openSignup() {
  document.getElementById("signupModal").style.display = "block";
  document.getElementById("modalOverlay").style.display = "block";
}
function closeSignup() {
  document.getElementById("signupModal").style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
}
function openLogin() {
  document.getElementById("loginModal").style.display = "block";
  document.getElementById("modalOverlay").style.display = "block";
}
function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
}
function switchToLogin() {
  closeSignup();
  openLogin();
}
function switchToSignup() {
  closeLogin();
  openSignup();
}

// ===== Signup Function =====
function signup() {
  let username = document.getElementById("signupUsername").value;
  let password = document.getElementById("signupPassword").value;

  if (username === "" || password === "") {
    alert("Please fill in all fields!");
    return;
  }

  if (localStorage.getItem(username)) {
    alert("User already exists! Try logging in.");
    return;
  }

  // Store user credentials in localStorage
  localStorage.setItem(username, password);
  alert("Signup successful! Now log in.");
  closeSignup();
  openLogin();
}

// ===== Login Function =====
function login() {
  var username = document.getElementById("loginUsername").value;
  var password = document.getElementById("loginPassword").value;

  // Check if the username exists in localStorage
  let storedPassword = localStorage.getItem(username);

  if (storedPassword && storedPassword === password) {
    // Close both modals just in case
    closeLogin();
    closeSignup(); // <- add this line to make sure signup modal also closes

    // Show Login Success Notification
    var successMsg = document.getElementById("loginSuccess");
    successMsg.style.display = "block";

    // Hide after 3 seconds
    setTimeout(function () {
      successMsg.style.display = "none";
    }, 3000);
  } else {
    alert("Invalid username or password!");
  }
}

//responsive-hamburger
const toggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
