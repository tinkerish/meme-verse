import { createRoot } from "react-dom/client";
import "./index.css";
import { ProtectedPage } from "./pages/ProtectedPage.tsx";
import "regenerator-runtime/runtime";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage.tsx";
import MyMemePageComponent from "./pages/Meme.tsx";
import AddMemePageComponent from "./pages/AddMeme.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import MemeDetails from "./components/Memes/MemeDetails.tsx";
import User from "./pages/User.tsx";
import LeaderBoard from "./pages/LeaderBoard.tsx";
import ErrorPage from "./pages/Error.tsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ProtectedPage />}>
        <Route index element={<HomePage />} />
        <Route path="my-meme" element={<MyMemePageComponent />} />
        <Route path="add-meme" element={<AddMemePageComponent />} />
        <Route path="meme/:id" element={<MemeDetails />} />
        <Route path="user" element={<User />} />
        <Route path="who-is-the-leader" element={<LeaderBoard />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);
createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
