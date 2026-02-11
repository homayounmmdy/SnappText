import { Copy } from "lucide-react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AppContext, copyToClipboard } from "../Utility/util";
import Badge from "./Badge";
import Button from "./Button.tsx";

const Workspace: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) return null;
  const { state, dispatch } = context;

  const handleCopyWorkspace = async () => {
    if (!state.workspaceText.trim()) {
      toast.error("Nothing to copy");
      return;
    }

    const success = await copyToClipboard(state.workspaceText);
    if (success) {
      toast.success("Copied to clipboard!");
    } else {
      toast.error("Failed to copy");
    }
  };

  const handleClearWorkspace = () => {
    dispatch({ type: "SET_WORKSPACE_TEXT", text: "" });
    toast.success("Workspace cleared");
  };

  return (
    <>
      <section className="bg-white rounded-3xl shadow-lg border-4 border-black relative overflow-hidden">
        {/* Doodle decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

        <div className="p-4 sm:p-6 relative z-10">
          <div className="flex gap-1 justify-between items-center mb-4">
            <div>
              <h2 className="sm:text-2xl font-sketch font-bold text-gray-900 relative inline-block">
                Workspace
                <span className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-300 -z-10"></span>
              </h2>
              <p className="text-gray-700 font-comic-bold hidden md:block text-sm mt-2 font-medium">
                Paste or edit your content here. Copied snippets appear
                automatically.
              </p>
            </div>
            <div className="flex justify-center gap-2">
              {state.workspaceText.trim() && (
                <Button
                    variant="danger"
                  onClick={handleClearWorkspace}
                  className="p-1.5 sm:px-4 font-sketch sm:py-2 text-gray-800  bg-white border-3 border-black rounded-full hover:bg-red-100 hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-sm font-bold"
                >
                  Clear
                </Button>
              )}

              <Button
                onClick={handleCopyWorkspace}
                disabled={!state.workspaceText.trim()}
                variant="success"
                className="p-1.5 sm:px-4 font-comic-bold sm:py-2  disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-full border-3 border-black flex items-center gap-2 transition-all font-bold shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={state.workspaceText}
              onChange={(e) =>
                dispatch({ type: "SET_WORKSPACE_TEXT", text: e.target.value })
              }
              placeholder="Paste your content here or copy a snippet above to see the result..."
              className="w-full font-comic h-64 px-4 py-3 border-3 border-black rounded-2xl focus:ring-4 focus:ring-yellow-300 focus:border-black resize-y text-sm leading-relaxed bg-gradient-to-br from-white to-blue-50 shadow-inner"
            />
            {/* Decorative corner accent */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-400 rounded-full border-3 border-black"></div>
          </div>

          <div className="flex justify-between items-center font-comic mt-4 text-sm text-gray-700 font-bold">
            <Badge variant="warning">
              {state.workspaceText.length} characters
            </Badge>
            <Badge>
              {state.workspaceText.split("\n").length} lines
            </Badge>
          </div>
        </div>
      </section>
    </>
  );
};

export default Workspace;
