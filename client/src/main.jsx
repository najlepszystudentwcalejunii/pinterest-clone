import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Gallery from "./components/gallery/Gallery.jsx";
import "./index.css";
import AuthPage from "./routes/AuthPage/AuthPage.jsx";
import PostPage from "./routes/PostPage/PostPage.jsx";
import SearchPage from "./routes/SearchPage/SearchPage.jsx";
import UserProfilePage from "./routes/UserProfilePage/UserProfilePage.jsx";
import CreatePage from "./routes/createPage/CreatePage.jsx";
import Homepage from "./routes/homepage/Homepage.jsx";
import MainLayout from "./routes/layouts/MainLayout.jsx";
import { ImageKitProvider } from "@imagekit/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImageKitProvider urlEndpoint={import.meta.env.VITE_IK_URL}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/pin/:id" element={<PostPage />} />
            <Route path="/:username" element={<UserProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </ImageKitProvider>
  </StrictMode>
);
