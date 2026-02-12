import React from "react";
import type { ActionType, AppStateType } from "../types";
import SearchBar from "./SearchBar";
import SnippetCard from "./SnippetCard";
import NoSnippet from "./NoSnippet.tsx";

interface Props {
  state: AppStateType;
  dispatch: React.Dispatch<ActionType>;
}
const AllSnippets = ({ state, dispatch }: Props) => {
  const filteredSnippets = state.snippets.filter((snippet) => {
    const searchTerm = (state.searchTerm || "").toLowerCase();
    return (
      snippet.title.toLowerCase().includes(searchTerm) ||
      (snippet.description || "").toLowerCase().includes(searchTerm)
    );
  });
  return (
    <>
      <SearchBar />
      {filteredSnippets.length === 0 ? (
        <NoSnippet dispatch={() => dispatch({ type: "OPEN_FORM" }) } />
      ) : (
        <div id="snippets-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </>
  );
};

export default AllSnippets;
