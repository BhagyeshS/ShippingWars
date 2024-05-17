import { API_RUN, WEB_RUN } from './URLCollention.js'

export async function parseTokenFromUrl() {
    const currentUrl = new URL(window.location.href);

    const urlParams = currentUrl.searchParams;
    const code = urlParams.get("code");

    return code;
}

// document.addEventListener("DOMContentLoaded", () => {
//     checkAndSetToken();
// });

const fetchOptions = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};


export async function login() {
    // let username;
    // let useremail;
    // let userDiv = document.getElementById("userName");
    // let userimage = document.getElementById("user-img");
    // let userimage1 = document.getElementById("user-img1");

    fetch(`https://api.github.com/user`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            // username = data.name ? data.name : "Profile";
            // useremail = data.email ? data.email : data.login;
            // localStorage.setItem("username", username);
            // localStorage.setItem("userEmail", useremail);
            // userDiv.innerText = localStorage.getItem("username");
            // userimage.src = data.avatar_url;
            // userimage1.src = data.avatar_url;
            console.log(data);
        });

    // let saved = false;
    // if (localStorage.getItem("username")) {
    //     const Employees = await GetAllEmployee();
    //     Employees.map((emp) => {
    //         if (localStorage.getItem("username") === emp.employeeName) {
    //             saved = true;
    //         }
    //     });
    // }
    // if (!saved) {
    //     const requestBody = {
    //         method: "POST",
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             employeeName: localStorage.getItem("username"),
    //             employeeReportsTo: 0,
    //         }),
    //     };

        // // Send the POST request
        // fetch(`${APIURL}employees`, requestBody)
        //     .then((response) => {
        //         if (!response.ok) {
        //             // openModal("Failed to add use");
        //             throw new Error("Failed to add user");
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         // openModal("User Added successfully:");
        //         loadEventsPage();
        //     })
        //     .catch((error) => {
        //         console.error("Error creating employee", error);
        //     });
    // }
}

export function loadLogin(flag) {
    const clientId = "Ov23liMIUo0ytzmbjhT2";
    const redirectUri = `${WEB_RUN}`;
    localStorage.setItem('flag',flag);

    // Construct Google OAuth URL with OpenID Connect for ID token
    const authUrl = `https://github.com/login/oauth/select_account?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=read`;

    // Redirect user to Google OAuth URL
    window.location.href = authUrl;
}


export async function checkAndSetToken() {
    const code = await parseTokenFromUrl();
    if (!localStorage.getItem("token")) {
        console.log("Code", code);
        const token = await getTokenFromCode(code);
        console.log("Token", token);
        if (!token.includes("error")) {
            localStorage.setItem("token", token);
        }
        window.location.href = `${WEB_RUN}`;
        // loadLogin();
    }
}

// Call the function
// checkAndSetToken();


async function getTokenFromCode(code) {
    const url = `${API_RUN}auth/code?code=${code}&flag=${localStorage.getItem('flag')}`;

    let Token = await fetch(url)
        .then((response) => response.text())
        .catch((error) => {
            console.error("Error fetching neighbourhood data:", error);
        });
    return Token;
}
