import React, {useEffect, useReducer} from "react";
import {Toaster} from "react-hot-toast";
import appReducer from "./appReducer";
import AllSnippets from "./components/AllSnippets";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PlaceholderModal from "./components/PlaceholderModal";
import SnippetForm from "./components/SnippetForm";
import Workspace from "./components/Workspace";
import {AppContext, getInitialState} from "./Utility/util";
import {LOCAL_STORAGE_KEY} from "./config/constants.ts";
import Joyride from "react-joyride";

const App: React.FC = () => {
    const [state, dispatch] = useReducer(appReducer, getInitialState());

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }, [state]);

    const steps = [
        {
            target: 'body',
            placement: 'center',
            title: 'Welcome to Snapp Text! 🚀',
            content: (
                <div>
                    <p><strong>Snapp Text</strong> is a fast and minimal snippet manager for reusable text templates
                        with dynamic placeholders.</p>
                    <p style={{marginTop: '10px'}}>Let's take a quick tour to show you the key features!</p>
                </div>
            ),
            disableBeacon: true,
        },
    ];

    return (
        <AppContext.Provider value={{state, dispatch}}>
            <Toaster/>
            <Header/>
            <Joyride
                steps={steps}
                showSkipButton={true}
                disableOverlayClose={true}
                spotlightPadding={5}
            />
            <div className=" bg-gray-50">
                <main className="max-w-6xl mx-auto p-6 h-full space-y-5">
                    <AllSnippets state={state} dispatch={dispatch}/>
                    <Workspace/>
                </main>
                <PlaceholderModal/>

                <SnippetForm/>
            </div>
            <Footer/>
        </AppContext.Provider>
    );
};

export default App;
