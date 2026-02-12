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
    <div id="#snippet-form" className="fixed inset-0 form-backdrop flex items-center justify-center p-4 z-40">
      <div className="form form-border bg-white max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl md:text-2xl form-title">
            {state.editingSnippet ? "Edit Snippet" : "New Snippet"}
          </h3>
          <Button
              variant='danger'
            onClick={() => dispatch({ type: "CLOSE_FORM" })}
            className="form-close"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block form-label mb-2">
              Title
            </label>
            <Input
              {...register("title")}
              type="text"
              className="w-full"
              placeholder="Enter snippet title"
            />
            {errors.title && (
              <p className="mt-2 form-label-error">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block form-label mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="form-textarea w-full px-4 py-3 resize-none"
              placeholder="Enter snippet content. Use {{placeholder}} for variables."
            />
            {errors.description && (
              <p className="mt-2 form-label-error">
                {errors.description.message}
              </p>
            )}
            <p className="text-[0.8rem] text-[#333] font-comic-bold mt-2">
              Use <Badge variant='warning'>{"{{variable}}"}</Badge> syntax for placeholders
            </p>
          </div>

          <div className="flex gap-3 mt-8">
            <Button
              type="button"
              variant="danger"
              outline
              onClick={() => dispatch({ type: "CLOSE_FORM" })}
              className="flex-1 px-4 py-3  form-btn font-sketch form-btn-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1 px-4 py-3 font-comic-bold form-btn form-btn-primary"
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
