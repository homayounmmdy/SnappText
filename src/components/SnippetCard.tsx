import { Copy, Edit, Trash2 } from "lucide-react";
import { useContext } from "react";
import toast from "react-hot-toast";
import {
  AppContext,
  copyToClipboard,
  extractPlaceholders,
} from "../Utility/util";
import type { SnippetType } from "../types";

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&family=Comic+Neue:wght@400;700&display=swap');
        
        .doodle-card {
          background: #FFF8E7;
          border: 3px solid #2D2D2D;
          border-radius: 20px;
          box-shadow: 6px 6px 0px #2D2D2D;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          position: relative;
          overflow: visible;
        }
        
        .doodle-card::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 15px;
          width: 30px;
          height: 16px;
          background: #FFD93D;
          border: 3px solid #2D2D2D;
          border-radius: 20px 20px 0 0;
          box-shadow: 50px 0 0 #FFD93D, 50px 0 0 3px #2D2D2D;
        }
        
        .doodle-card:hover {
          transform: translateY(-5px) rotate(-1deg);
          box-shadow: 8px 8px 0px #2D2D2D;
        }
        
        .doodle-title {
          font-family: 'Cabin Sketch', cursive;
          font-weight: 700;
          color: #2D2D2D;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        
        .doodle-text {
          font-family: 'Comic Neue', cursive;
          color: #4A4A4A;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .doodle-button-group {
          display: flex;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .doodle-card:hover .doodle-button-group {
          opacity: 1;
        }
        
        .doodle-icon-btn {
          background: #FFE5E5;
          border: 2px solid #2D2D2D;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0;
        }
        
        .doodle-icon-btn:hover {
          background: #FF6B6B;
          transform: rotate(10deg) scale(1.1);
        }
        
        .doodle-icon-btn svg {
          width: 16px;
          height: 16px;
          color: #2D2D2D;
        }
        
        .doodle-copy-btn {
          background: #4ECDC4;
          border: 3px solid #2D2D2D;
          border-radius: 15px;
          font-family: 'Cabin Sketch', cursive;
          font-weight: 700;
          font-size: 1rem;
          color: #2D2D2D;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 4px 4px 0px #2D2D2D;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
        }
        
        .doodle-copy-btn:hover {
          background: #45B7AF;
          transform: translateY(-2px);
          box-shadow: 5px 5px 0px #2D2D2D;
        }
        
        .doodle-copy-btn:active {
          transform: translateY(2px);
          box-shadow: 2px 2px 0px #2D2D2D;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      
      <div className="doodle-card">
        <div className="p-4 flex justify-between h-full flex-col">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="doodle-title">
                {snippet.title}
              </h3>
              <p className="doodle-text mb-4 line-clamp-3">
                {snippet.description}
              </p>
            </div>
            
            <div className="doodle-button-group">
              <button
                onClick={() => dispatch({ type: "OPEN_FORM", snippet })}
                className="doodle-icon-btn"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="doodle-icon-btn"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <button
            onClick={handleCopy}
            className="doodle-copy-btn"
          >
            <Copy className="w-4 h-4" />
            Copy Snippet
          </button>
        </div>
      </div>
    </>
  );
};

export default SnippetCard;
