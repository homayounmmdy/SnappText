import React, { useEffect, useReducer } from "react";
import { Toaster } from "react-hot-toast";
import appReducer from "./appReducer";
import AllSnippets from "./components/AllSnippets";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PlaceholderModal from "./components/PlaceholderModal";
import SnippetForm from "./components/SnippetForm";
import UserJourney from "./components/UserJourney.tsx";
import Workspace from "./components/Workspace";
import { LOCAL_STORAGE_KEY } from "./config/constants.ts";
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
      <UserJourney />
      <div className=" bg-gray-50">
        <main className="max-w-6xl mx-auto p-6 h-full space-y-5">
          <AllSnippets state={state} dispatch={dispatch} />
          <Workspace />
        </main>
        <PlaceholderModal />

        <SnippetForm />
      </div>
      <Footer />
    </AppContext.Provider>
  );
};

export default App;
