import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { AppContext } from "../Utility/util";
import Badge from "./Badge";
import Input from "./Input";
import Button from "./Button.tsx";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

type FormData = z.infer<typeof formSchema>;

const SnippetForm = () => {
  const context = useContext(AppContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  if (!context) return null;
  const { state, dispatch } = context;

  useEffect(() => {
    if (state.editingSnippet) {
      setValue("title", state.editingSnippet.title);
      setValue("description", state.editingSnippet.description);
    } else {
      reset();
    }
  }, [state.editingSnippet]);

  if (!state.isFormOpen) return null;

  const onSubmit = (data: FormData) => {
    if (state.editingSnippet) {
      dispatch({
        type: "UPDATE_SNIPPET",
        snippet: { ...state.editingSnippet, ...data },
      });
    } else {
      dispatch({
        type: "ADD_SNIPPET",
        snippet: {
          id: Date.now().toString(),
          ...data,
          createdAt: new Date(),
        },
      });
    }

    dispatch({ type: "CLOSE_FORM" });
    reset();
  };

  return (
    <div className="fixed inset-0 doodle-backdrop flex items-center justify-center p-4 z-40">
      <style>{`
        @keyframes doodleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(1deg); }
        }
        
        .doodle-form {
          animation: doodleFloat 3s ease-in-out infinite;
        }
        
        .doodle-border {
          border: 3px solid #000;
          border-radius: 20px;
          box-shadow: 
            4px 4px 0px #000,
            8px 8px 0px rgba(255, 107, 107, 0.3);
        }
        

        
        .doodle-textarea {
          border: 2.5px solid #000;
          border-radius: 12px;
          background: #fff;
          transition: all 0.2s ease;
          font-family: 'Comic Sans MS', cursive, sans-serif;
        }
        
        .doodle-textarea:focus {
          outline: none;
          transform: translateY(-2px);
          box-shadow: 3px 3px 0px #FF6B6B;
          border-color: #FF6B6B;
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
          backdrop-filter: blur(8px);
        }
        
        .doodle-hint {
          font-family: 'Comic Sans MS', cursive, sans-serif;
          font-size: 0.8rem;
          color: #333;
          font-weight: 600;
        }
      `}</style>
      
      <div className="doodle-form doodle-border bg-white max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl doodle-title">
            {state.editingSnippet ? "Edit Snippet" : "New Snippet"}
          </h3>
          <Button
            onClick={() => dispatch({ type: "CLOSE_FORM" })}
            className="doodle-close"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block doodle-label mb-2">
              Title
            </label>
            <Input
              {...register("title")}
              type="text"
              className="w-full"
              placeholder="Enter snippet title"
            />
            {errors.title && (
              <p className="mt-2 doodle-error">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block doodle-label mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="doodle-textarea w-full px-4 py-3 resize-none"
              placeholder="Enter snippet content. Use {{placeholder}} for variables."
            />
            <p className="doodle-hint mt-2">
              Use <Badge variant='warning'>{"{{variable}}"}</Badge> syntax for placeholders
            </p>
            {errors.description && (
              <p className="mt-2 doodle-error">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 mt-8">
            <Button
              type="button"
              onClick={() => dispatch({ type: "CLOSE_FORM" })}
              className="flex-1 px-4 py-3 cursor-pointer doodle-button doodle-button-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 px-4 py-3 cursor-pointer doodle-button doodle-button-primary"
            >
              {state.editingSnippet ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SnippetForm;
