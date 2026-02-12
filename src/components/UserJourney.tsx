import Joyride from "react-joyride";
import PlayfulTooltip from "./PlayfulTooltip.tsx";
import Beacon from "./Beacon.tsx";

const UserJourney = () => {
    const steps = [
        {
            target: 'body',
            placement: 'center',
            title: 'Welcome to Snapp Text! 🚀',
            content: (
                <div>
                    <p><strong>Snapp Text</strong> is a fast and minimal snippet manager for reusable text templates
                        with dynamic placeholders.</p>
                    <p style={{marginTop: '10px'}}>Let's take a quick tour to show you the key features!</p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: '#addSnippetBtn',
            title: '✨ Create New Snippet',
            content: (
                <div>
                    <p>Click here to add a new text template.</p>
                    <div className="mt-3 p-3 bg-[#FFE5E5] border-3 border-black rounded-xl">
                        <code className="font-comic-bold text-sm">
                            Hello {'{{name}}'}, your invoice is ready!
                        </code>
                    </div>
                    <p className="mt-2 text-xs">
                        Use {'{{double curly braces}}'} for dynamic content!
                    </p>
                </div>
            ),
            placement: 'bottom',
            disableBeacon: true,
        },
    ];

    return (
        <Joyride
            steps={steps}
            continuous={true}
            showProgress={true}
            showSkipButton={true}
            disableOverlayClose={true}
            spotlightPadding={10}
            styles={{
                options: {
                    zIndex: 1000
                },
                spotlight: {
                    borderRadius: 16,
                    border: '4px solid #FF6B6B',
                    animation: 'pulse 2s infinite',
                },
                overlay: {
                    background: 'repeating-linear-gradient(\n' +
                        '                45deg,\n' +
                        '                rgba(255, 230, 109, 0.1),\n' +
                        '                rgba(255, 230, 109, 0.1) 10px,\n' +
                        '                rgba(255, 107, 107, 0.1) 10px,\n' +
                        '                rgba(255, 107, 107, 0.1) 20px',
                    backdropFilter: 'blur(8px)',
                }
            }}
            beaconComponent={Beacon}
            tooltipComponent={PlayfulTooltip}

        />
    );
};

export default UserJourney;
