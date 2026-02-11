import { Copy, Edit, Trash2 } from "lucide-react";
import { useContext } from "react";
import toast from "react-hot-toast";
import {
  AppContext,
  copyToClipboard,
  extractPlaceholders,
} from "../Utility/util";
import type { SnippetType } from "../types";
import Button from "./Button.tsx";

interface Props {
  snippet: SnippetType;
}

const SnippetCard: React.FC<Props> = ({ snippet }: Props) => {
  const context = useContext(AppContext);

  if (!context) return null;
  const { dispatch } = context;

  const handleCopy = async () => {
    const placeholders = extractPlaceholders(snippet.description);

    if (placeholders.length > 0) {
      dispatch({ type: "OPEN_MODAL", snippet, placeholders });
    } else {
      const success = await copyToClipboard(snippet.description);
      if (success) {
        toast.success("Copied to clipboard!");
      } else {
        toast.error("Failed to copy");
      }
    }
  };

  const handleDelete = () => {
    if (window.confirm("Delete this snippet?")) {
      dispatch({ type: "DELETE_SNIPPET", id: snippet.id });
      toast.success("Snippet deleted");
    }
  };

  return (
    <>
      <div className="group card">
        <div className="p-4 flex justify-between h-full flex-col">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="card-title">
                {snippet.title}
              </h3>
              <p className="card-text mb-4 line-clamp-3">
                {snippet.description}
              </p>
            </div>
            
            <div className="flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Button
                onClick={() => dispatch({ type: "OPEN_FORM", snippet })}
                className="card-icon-btn"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleDelete}
                className="card-icon-btn"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <Button
            onClick={handleCopy}
            variant='success'
            outline
            className="card-copy-btn"
          >
            <Copy className="w-4 h-4" />
            Copy Snippet
          </Button>
        </div>
      </div>
    </>
  );
};

export default SnippetCard;
