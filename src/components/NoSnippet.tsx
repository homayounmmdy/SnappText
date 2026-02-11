import {Copy, Plus} from "lucide-react";
import Button from "./Button.tsx";
import type {ActionType} from "../types.tsx";

function NoSnippet({dispatch} : { dispatch : (value: ActionType) => void}) {
    return (
        <div className="text-center flex justify-center items-center flex-col gap-2 py-6 md:py-12">
            <div className="text-gray-400 mb-4">
                <Copy className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-xl md:text-2xl font-sketch font-semibold text-gray-600 mb-2">
                No snippets Found
            </h2>
            <Button
                onClick={() => dispatch({ type: "OPEN_FORM" })}
                className="bg-white font-comic-bold hover:bg-red-50 text-gray-900 px-4 py-2  rounded-2xl flex items-center gap-2 transition-all hover:scale-105 hover:rotate-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-3 border-black relative group"
            >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                Add Snippet
                {/* Doodle decoration */}
                <svg className="absolute -top-2 -right-2 w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" fill="#fbbf24" stroke="#000" strokeWidth="2"/>
                    <path d="M 8 12 L 12 8 L 16 12" stroke="#000" strokeWidth="2" fill="none"/>
                </svg>
            </Button>
        </div>
    );
}

export default NoSnippet;