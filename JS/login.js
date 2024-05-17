import { API_RUN, WEB_RUN } from './URLCollection.js' 

async function parseTokenFromUrl() {
    const currentUrl = new URL(window.location.href);

    const urlParams = currentUrl.searchParams;
    const code = urlParams.get("code");

    return code;
}


function RedirectToLogIn() {
    loadLogin();
}


const fetchOptions = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
};

function loadLogin() {
    const clientId = "Ov23liMIUo0ytzmbjhT2";
    const redirectUri = `${API_RUN}`;


    // Construct Google OAuth URL with OpenID Connect for ID token
    const authUrl = `https://github.com/login/oauth/select_account?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=read`;

    // Redirect user to Google OAuth URL
    window.location.href = authUrl;
}


async function checkAndSetToken() {
    if (!localStorage.getItem("token")) {
        const code = await parseTokenFromUrl();
        if (code) {
            console.log("Code", code);
            const token = await getTokenFromCode(code);
            console.log("Token", token);
            if (!token.includes("error")) {
                localStorage.setItem("token", token);
            }
            window.location.href = `${API_RUN}`;
        }
    }
}

// Call the function
checkAndSetToken();


async function getTokenFromCode(code) {
    const url = `${API_RUN}/auth/code?code=${code}`;

    let Token = await fetch(url)
        .then((response) => response.text())
        .catch((error) => {
            console.error("Error fetching neighbourhood data:", error);
        });
    return Token;
}
