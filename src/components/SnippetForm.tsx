import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { AppContext } from "../Utility/util";

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
    <div className="fixed inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 bg-opacity-95 flex items-center justify-center p-4 z-40">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Comic+Neue:wght@400;700&display=swap');
        
        .doodle-container {
          font-family: 'Comic Neue', cursive;
          position: relative;
        }
        
        .doodle-title {
          font-family: 'Caveat', cursive;
        }
        
        .doodle-box {
          border: 3px solid #2D3748;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          box-shadow: 
            8px 8px 0px rgba(255, 107, 107, 0.3),
            -2px -2px 0px rgba(66, 153, 225, 0.2);
          animation: wiggle 0.3s ease-in-out;
        }
        
        @keyframes wiggle {
          0% { transform: rotate(0deg) scale(0.95); }
          50% { transform: rotate(1deg) scale(1.02); }
          100% { transform: rotate(0deg) scale(1); }
        }
        
        .doodle-input {
          border: 3px solid #2D3748;
          border-radius: 15px 50px 30px 40px / 40px 30px 50px 20px;
          transition: all 0.2s ease;
          background: white;
          box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
        }
        
        .doodle-input:focus {
          outline: none;
          border-color: #FF6B6B;
          transform: rotate(-1deg);
          box-shadow: 4px 4px 0px rgba(255, 107, 107, 0.3);
        }
        
        .doodle-button {
          border: 3px solid #2D3748;
          border-radius: 20px 40px 30px 50px / 50px 20px 40px 30px;
          transition: all 0.2s ease;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          box-shadow: 4px 4px 0px #2D3748;
        }
        
        .doodle-button:hover {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px #2D3748;
        }
        
        .doodle-button:active {
          transform: translate(4px, 4px);
          box-shadow: 0px 0px 0px #2D3748;
        }
        
        .doodle-btn-primary {
          background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
          color: white;
        }
        
        .doodle-btn-secondary {
          background: white;
          color: #2D3748;
        }
        
        .squiggle {
          position: absolute;
          pointer-events: none;
        }
        
        .star-doodle {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>
      
      <div className="doodle-container bg-white doodle-box max-w-md w-full p-8 relative">
        {/* Decorative doodles */}
        <div className="squiggle absolute -top-6 -left-6 text-4xl star-doodle">⭐</div>
        <div className="squiggle absolute -top-4 -right-4 text-3xl star-doodle" style={{animationDelay: '0.5s'}}>✨</div>
        <div className="squiggle absolute -bottom-6 -right-6 text-4xl star-doodle" style={{animationDelay: '1s'}}>💫</div>
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="doodle-title text-3xl font-bold text-gray-800">
            {state.editingSnippet ? "✏ Edit Snippet" : "✨ New Snippet"}
          </h3>
          <button
            onClick={() => dispatch({ type: "CLOSE_FORM" })}
            className="text-gray-600 hover:text-red-500 cursor-pointer transition-all hover:rotate-90 duration-300"
          >
            <X className="w-7 h-7" strokeWidth={3} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-2 doodle-title">
              📝 Title
            </label>
            <input
              {...register("title")}
              type="text"
              className="doodle-input w-full px-4 py-3 text-lg"
              placeholder="Enter snippet title"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600 font-bold flex items-center gap-1">
                ⚠ {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-bold text-gray-700 mb-2 doodle-title">
              💭 Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="doodle-input w-full px-4 py-3 resize-none text-lg"
              placeholder="Enter snippet content. Use {{placeholder}} for variables."
            />
            <p className="text-sm text-gray-600 mt-2 font-semibold">
              💡 Use <code className="bg-yellow-100 px-2 py-1 rounded-lg border-2 border-gray-800">{"{{variable}}"}</code> syntax for placeholders
            </p>
            {errors.description && (
              <p className="mt-2 text-sm text-red-600 font-bold flex items-center gap-1">
                ⚠ {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => dispatch({ type: "CLOSE_FORM" })}
              className="doodle-button doodle-btn-secondary flex-1 px-6 py-3 cursor-pointer text-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="doodle-button doodle-btn-primary flex-1 px-6 py-3 cursor-pointer text-lg"
            >
              {state.editingSnippet ? "Update" : "Add"} ✓
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SnippetForm;
