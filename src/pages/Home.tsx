import { useContext } from "react";
import AllSnippets from "../components/AllSnippets";
import PlaceholderModal from "../components/PlaceholderModal";
import SnippetForm from "../components/SnippetForm";
import UserJourney from "../components/UserJourney";
import Workspace from "../components/Workspace";
import { AppContext } from "../Utility/util";

const Home = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { state, dispatch } = context;

  return (
    <>
      <UserJourney />
      <div className="bg-gray-50">
        <main className="max-w-6xl mx-auto p-6 h-full space-y-5">
          <AllSnippets state={state} dispatch={dispatch} />
          <Workspace />
        </main>
        <PlaceholderModal />
        <SnippetForm />
      </div>
    </>
  );
};

export default Home;
