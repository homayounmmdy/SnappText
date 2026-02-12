import type {Step} from "react-joyride";
import Button from "./Button";

export interface DoodleStep extends Step {
    totalSteps?: number;
    showProgress?: boolean;
}

interface Props {
    backProps: {
        'aria-label': string;
        onClick: (e: React.MouseEvent<HTMLElement>) => void;
        title: string;
    };
    index: number;
    continuous: boolean;
    step: DoodleStep;
    closeProps: {
        'aria-label': string;
        onClick: (e: React.MouseEvent<HTMLElement>) => void;
        title: string;
    };
    skipProps: {
        'aria-label': string;
        onClick: (e: React.MouseEvent<HTMLElement>) => void;
        title: string;
    };
    primaryProps: {
        'aria-label': string;
        onClick: (e: React.MouseEvent<HTMLElement>) => void;
        title: string;
    };
}

const PlayfulTooltip = ({index, step, closeProps, skipProps,backProps, continuous, primaryProps}: Props) => {
    const {title, content} = step;
    const totalSteps = step.totalSteps || 0;
    return (
        <div
            className="form form-border bg-[#FFF8E7] max-w-sm w-full p-6 relative
                 border-4 border-black rounded-[20px] shadow-[8px_8px_0_#2D2D2D]">
            <div className="absolute -top-3 left-6 w-8 h-4 bg-[#FFD93D] border-3 border-black rounded-t-xl
                    shadow-[20px_0_0_#FFD93D,20px_0_0_3px_#000]"></div>

            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-[#FF6B6B]
                    rotate-3 rounded-tr-2xl"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-[#4A90E2]
                    -rotate-3 rounded-bl-2xl"></div>

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-[#FF6B6B] border-2 border-black rounded-full
                         animate-pulse"></span>
                        <span className="font-comic-bold text-xs uppercase text-[#333] tracking-wider">
              Step {index + 1}
            </span>
                    </div>
                    {title && (
                        <h3 className="font-sketch text-2xl text-black uppercase tracking-[1px]
                         border-b-3 border-black pb-2 inline-block">
                            {title}
                        </h3>
                    )}
                </div>
                {/* Close Button */}
                <Button
                    {...closeProps}
                    variant="danger"
                    className="form-close"
                >
                    <span className="text-black font-bold">✕</span>
                </Button>
            </div>

                 {/* Content */}
      <div className="font-comic text-[#4A4A4A] text-base leading-relaxed mb-6
                    bg-white p-4 rounded-xl border-3 border-black
                    shadow-[3px_3px_0_#FFE5E5] relative">
        {/* Hand-drawn quote marks */}
        <span className="absolute -top-2 left-2 text-4xl text-[#FFD93D] font-bold">"</span>
        {content}
        <span className="absolute -bottom-4 right-2 text-4xl text-[#FFD93D] font-bold rotate-180">"</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 mt-4">
      <div className="flex gap-2">
      <Button
            {...skipProps}
            className="px-4 py-2 font-comic-bold text-sm border-3 border-black
                     rounded-xl bg-gray-100 hover:bg-gray-200
                     shadow-[2px_2px_0_#000] hover:shadow-[4px_4px_0_#000]
                     transform hover:-translate-x-0.5 hover:-translate-y-0.5
                     transition-all duration-150"
          >
            Skip 🏃
          </Button>
            {index > 0 && (
            <Button
              {...backProps}
              className="px-4 py-2 font-comic-bold text-sm border-3 border-black
                       rounded-xl bg-[#FFE5E5] hover:bg-[#FFD3D3]
                       shadow-[2px_2px_0_#000] hover:shadow-[4px_4px_0_#000]
                       transform hover:-translate-x-0.5 hover:-translate-y-0.5
                       transition-all duration-150"
            >
              ← Back
            </Button>
          )}
      </div>
      <Button
          {...primaryProps}
          className={`px-3 py-1 font-sketch text-lg border-3 border-black 
                    rounded-xl shadow-[3px_3px_0_#000] 
                    transform hover:-translate-x-0.5 hover:-translate-y-0.5
                    hover:shadow-[5px_5px_0_#000] active:translate-x-0 active:translate-y-0
                    transition-all duration-150
                    `}
          variant={continuous && index === 0  ? 'success' : 'info'}
        >
          {continuous ? (index === 0 ? 'Start →' : index === totalSteps - 1 ? '🎉 Done!' : 'Next →') : 'Close'}
        </Button>
      </div>

      {/* Progress Indicator */}
        {step.showProgress && totalSteps > 0 && (
        <div className="mt-4 pt-3 border-t-3 border-black border-dashed">
          <div className="flex items-center gap-2">
            <span className="font-comic-bold text-xs uppercase text-[#333]">
              Progress
            </span>
            <div className="flex-1 h-4 bg-white border-3 border-black rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFD93D] border-r-3 border-black transition-all duration-500"
                style={{ width: `${((index + 1) / totalSteps) * 100}%` }}
              >
                <div className="w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:16px_16px]"></div>
              </div>
            </div>
            <span className="font-sketch text-sm">
              {index + 1}/{totalSteps}
            </span>
          </div>
        </div>
      )}
        </div>
    )
};

export default PlayfulTooltip;