let registeredUsers = [
  {
    username: "john_doe",
    password: "John@1234",
    email: "john@example.com",
    mobile: "9876543210",
    aadhar: "123456789012",
    role: "customer",
  },
  {
    username: "jane_admin",
    password: "JaneAdmin@123",
    email: "jane@example.com",
    mobile: "8765432109",
    aadhar: "987654321098",
    role: "admin",
  },
  {
    username: "sam_customer",
    password: "SamCustomer@123",
    email: "sam@example.com",
    mobile: "9123456780",
    aadhar: "123098765432",
    role: "customer",
  },
  {
    username: "Kishan",
    password: "Kishan@123",
    role: "customer",
  },
];


function showRegistration() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("registrationPage").style.display = "block";
}

function showLogin() {
  document.getElementById("loginPage").style.display = "block";
  document.getElementById("registrationPage").style.display = "none";
}

function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("regConfirmPassword").value;
  const email = document.getElementById("regEmail").value;
  const mobile = document.getElementById("regMobile").value;
  const aadhar = document.getElementById("regAadhar").value;
  const role = document.getElementById("regRole").value; 

 
  const usernameRegex = /^[a-zA-Z]{6,}$/;
  if (!usernameRegex.test(username)) {
    alert("Username must be at least 6 characters and contain only letters.");
    return;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 8 characters long and contain an upper case letter, a number, and a special character."
    );
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Invalid email format.");
    return;
  }


  if (!/^\d{10}$/.test(mobile)) {
    alert("Mobile number must be 10 digits.");
    return;
  }


  if (!/^\d{12}$/.test(aadhar)) {
    alert("Aadhar number must be 12 digits.");
    return;
  }

  registeredUsers.push({ username, password, email, mobile, aadhar, role });
  alert("Registration successful. Please login.");
  showLogin();
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const portalType = document.getElementById("portalType").value;

  const user = registeredUsers.find(
    (user) => user.username === username && user.password === password
  );

  if (
    portalType == "customer" &&
    username == "rootuser" &&
    password == "Root@123"
  ) {
    showCustomerPortal();
    return;
  }

  if (
    portalType === "admin" &&
    username == "admin" &&
    password == "Admin@123"
  ) {
    showAdminPortal();
    return;
  }

  if (!user) {
    alert("User not registered. Please register first.");
    return;
  }

  if (user.role !== portalType) {
    alert(`Invalid credentials for ${portalType}.`);
    return;
  }

  if (portalType === "admin") {
    showAdminPortal();
  } else if (portalType == "customer") {
    showCustomerPortal();
  } else {
    alert("Customer portal is under development.");
  }
}


function showAdminPortal() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("adminPortal").style.display = "block";
}


function showAdminHome() {
  document.getElementById("adminHomePage").style.display = "block";
  document.getElementById("registerTrainPage").style.display = "none";
  document.getElementById("adminProfilePage").style.display = "none";
}

function showRegisterTrain() {
  document.getElementById("adminHomePage").style.display = "none";
  document.getElementById("registerTrainPage").style.display = "block";
  document.getElementById("adminProfilePage").style.display = "none";
}

function showAdminProfile() {
  document.getElementById("adminHomePage").style.display = "none";
  document.getElementById("registerTrainPage").style.display = "none";
  document.getElementById("adminProfilePage").style.display = "block";
}

function logout() {
  document.getElementById("adminPortal").style.display = "none";
  document.getElementById("customerPortal").style.display = "none";
  showLogin();
}


function showCustomerPortal() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("customerPortal").style.display = "block";
  showTab("home");
}

function showTab(tabName) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => {
    tab.style.display = "none";
  });

  const selectedTab = document.getElementById(tabName + "Tab");
  if (selectedTab) {
    selectedTab.style.display = "block";
  }
}
