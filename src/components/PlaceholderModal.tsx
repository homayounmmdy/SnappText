import {zodResolver} from "@hookform/resolvers/zod";
import {Copy, X} from "lucide-react";
import {useContext} from "react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import type {PlaceholderValueType} from "../types";
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
        formState: {errors},
        reset,
    } = useForm<PlaceholderValueType>({
        resolver: zodResolver(
            z.object({}).catchall(z.string().min(1, "This field is required"))
        ),
    });

    if (!context) return null;
    const {state, dispatch} = context;

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
                dispatch({type: "CLOSE_MODAL"});
                reset();
            }, 1500);
        } else {
            toast.error("Failed to copy");
        }
    };

    if (!state.isModalOpen || !state.currentSnippet) return null;

    return (
        <div className="fixed form inset-0 filter form-backdrop flex items-center justify-center p-4 z-40">
            <div className="form-border bg-white max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl md:text-2xl form-title">
                            Fill Placeholders
                        </h3>
                        <Button
                            onClick={() => dispatch({type: "CLOSE_MODAL"})}
                            className="form-close"
                        >
                            <X className="w-4 h-4"/>
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {state.placeholders.map((placeholder) => (
                            <div key={placeholder}>
                                <label className="block form-label mb-2">
                                    {placeholder}
                                </label>
                                <Input
                                    type="text"
                                    {...register(placeholder)}
                                    className="w-full"
                                    placeholder={`Enter ${placeholder}`}
                                />
                                {errors[placeholder] && (
                                    <p className="mt-2 form-label-error">
                                        {errors[placeholder]?.message}
                                    </p>
                                )}
                            </div>
                        ))}

                        <div className="flex gap-3 mt-8">
                            <Button
                                type="button"
                                variant='danger'
                                outline
                                onClick={() => dispatch({type: "CLOSE_MODAL"})}
                                className="flex-1 px-4 py-3 font-sketch form-btn form-btn-secondary"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                className="flex-1 px-4 py-3 font-comic-bold  form-btn form-btn-primary flex items-center justify-center gap-2"
                            >
                                <Copy className="w-4 h-4"/>
                                Copy
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlaceholderModal;
