import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, X } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import type { PlaceholderValueType } from "../types";
import {
  AppContext,
  copyToClipboard,
  replacePlaceholders,
} from "../Utility/util";
import Input from "./Input";
import Button from "./Button.tsx";

const PlaceholderModal: React.FC = () => {
  const context = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlaceholderValueType>({
    resolver: zodResolver(
      z.object({}).catchall(z.string().min(1, "This field is required"))
    ),
  });

  if (!context) return null;
  const { state, dispatch } = context;

  const onSubmit = async (data: PlaceholderValueType) => {
    if (!state.currentSnippet) return;

    const processedText = replacePlaceholders(
      state.currentSnippet.description,
      data
    );
    const success = await copyToClipboard(processedText);

    if (success) {
      toast.success("Copied to clipboard!");
      setTimeout(() => {
        dispatch({ type: "CLOSE_MODAL" });
        reset();
      }, 1500);
    } else {
      toast.error("Failed to copy");
    }
  };

  if (!state.isModalOpen || !state.currentSnippet) return null;

  return (
    <>
      <style>{`
        @keyframes doodleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(1deg); }
        }
        
        .doodle-modal {
          animation: doodleFloat 3s ease-in-out infinite;
        }
        
        .doodle-border {
          border: 3px solid #000;
          border-radius: 20px;
          box-shadow: 
            4px 4px 0px #000,
            8px 8px 0px rgba(255, 107, 107, 0.3);
        }
        
        .doodle-button {
          border: 2.5px solid #000;
          border-radius: 12px;
          font-weight: bold;
          transition: all 0.15s ease;
          position: relative;
          font-family: 'Comic Sans MS', cursive, sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .doodle-button:hover {
          transform: translate(-2px, -2px);
        }
        
        .doodle-button:active {
          transform: translate(0px, 0px);
        }
        
        .doodle-button-primary {
          background: #FF6B6B;
          color: white;
          box-shadow: 3px 3px 0px #000;
        }
        
        .doodle-button-primary:hover {
          background: #FF5252;
          box-shadow: 5px 5px 0px #000;
        }
        
        .doodle-button-primary:active {
          box-shadow: 2px 2px 0px #000;
        }
        
        .doodle-button-secondary {
          background: #FFF;
          color: #000;
          box-shadow: 3px 3px 0px #000;
        }
        
        .doodle-button-secondary:hover {
          background: #F0F0F0;
          box-shadow: 5px 5px 0px #000;
        }
        
        .doodle-button-secondary:active {
          box-shadow: 2px 2px 0px #000;
        }
        
        .doodle-label {
          font-family: 'Comic Sans MS', cursive, sans-serif;
          font-weight: bold;
          color: #000;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }
        
        .doodle-title {
          font-family: 'Comic Sans MS', cursive, sans-serif;
          font-weight: bold;
          color: #000;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .doodle-close {
          border: 2.5px solid #000;
          border-radius: 50%;
          background: #FFF;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
          box-shadow: 2px 2px 0px #000;
        }
        
        .doodle-close:hover {
          background: #FFE66D;
          transform: rotate(90deg);
          box-shadow: 3px 3px 0px #000;
        }
        
        .doodle-error {
          font-family: 'Comic Sans MS', cursive, sans-serif;
          color: #FF6B6B;
          font-weight: bold;
          font-size: 0.8rem;
        }
        
        .doodle-backdrop {
          background: 
            repeating-linear-gradient(
              45deg,
              rgba(255, 230, 109, 0.1),
              rgba(255, 230, 109, 0.1) 10px,
              rgba(255, 107, 107, 0.1) 10px,
              rgba(255, 107, 107, 0.1) 20px
            );
        }
      `}</style>
      
      <div className="fixed inset-0 filter backdrop-blur-md doodle-backdrop flex items-center justify-center p-4 z-40">
        <div className="doodle-modal doodle-border bg-white max-w-md w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl doodle-title">
                Fill Placeholders
              </h3>
              <Button
                onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                className="doodle-close"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {state.placeholders.map((placeholder) => (
                <div key={placeholder}>
                  <label className="block doodle-label mb-2">
                    {placeholder}
                  </label>
                  <Input
                    type="text"
                    {...register(placeholder)}
                    className="w-full"
                    placeholder={`Enter ${placeholder}`}
                  />
                  {errors[placeholder] && (
                    <p className="mt-2 doodle-error">
                      {errors[placeholder]?.message}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex gap-3 mt-8">
                <Button
                  type="button"
                  variant='danger'
                  onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                  className="flex-1 px-4 py-3 cursor-pointer doodle-button doodle-button-secondary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1 px-4 py-3 cursor-pointer doodle-button doodle-button-primary flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceholderModal;
