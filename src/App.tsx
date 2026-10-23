import React, { useEffect, useReducer } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { LOCAL_STORAGE_KEY } from "./config/constants";
import About from "./pages/About";
import Admin from "./pages/Admin";
import ChangelogData from "./pages/Changelog";
import Home from "./pages/Home";
import SnippetStore from "./pages/SnippetStore";
import appReducer from "./Utility/appReducer";
import { AppContext, getInitialState } from "./Utility/util";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, getInitialState());

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Toaster
        gutter={14}
        containerStyle={{ top: 24, right: 24, left: 24 }}
        toastOptions={{
          duration: 4000,
          ariaProps: { role: "status", "aria-live": "polite" },
          style: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
            color: "inherit",
            maxWidth: "none",
            width: "100%",
            minWidth: "280px",
            borderRadius: 0,
          },
        }}
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/changelog" element={<ChangelogData />} />
        <Route path="/store" element={<SnippetStore />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </AppContext.Provider>
  );
};

export default App;
