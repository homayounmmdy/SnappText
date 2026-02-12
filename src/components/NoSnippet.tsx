import {Copy} from "lucide-react";
import type {ActionType} from "../types.tsx";
import AddSnippetBtn from "./AddSnippetBtn.tsx";

function NoSnippet({dispatch} : { dispatch : (value: ActionType) => void}) {
    return (
        <div className="text-center flex justify-center items-center flex-col gap-2 py-6 md:py-12">
            <div className="text-gray-400 mb-4">
                <Copy className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-xl md:text-2xl font-sketch font-semibold text-gray-600 mb-2">
                No snippets Found
            </h2>
            <AddSnippetBtn handleClick={() => dispatch({ type: "OPEN_FORM" })} />
        </div>
    );
}

export default NoSnippet;