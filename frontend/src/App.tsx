import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import MainApp from "./MainApp.tsx";
import PreviewApp from "./PreviewApp.tsx";

const App: React.FC = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('Code:', code);

    if (code) {
        (async () => {
            const body = `code=${code}&client_id=80810281685-eqf05nodee3q27j6p0ki7bgvm7qlq1jn.apps.googleusercontent.com&client_secret=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&redirect_uri=http://localhost:5173/dashboard&grant_type=authorization_code`;
            console.log('Request body:', body);

            const tokenResponse = await fetch('https://www.googleapis.com/oauth2/v4/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body,
            });

            console.log('Token response status:', tokenResponse.status);
            console.log('Token response headers:', JSON.stringify(tokenResponse.headers));

            const tokenData = await tokenResponse.json();
            console.log('Token data:', JSON.stringify(tokenData));

            const accessToken = tokenData.access_token;
            console.log('Access token:', accessToken);

            const profileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log('Profile response status:', profileResponse.status);
            console.log('Profile response headers:', JSON.stringify(profileResponse.headers));

            const profileData = await profileResponse.json();
            console.log('Profile data:', JSON.stringify(profileData));

            localStorage.setItem('profile', JSON.stringify(profileData));
        })();
    }

    return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainApp />} />
        <Route path="/preview/*" element={<PreviewApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
