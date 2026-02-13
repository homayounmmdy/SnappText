import type {Step} from "react-joyride";

export const userJourneySteps: Step[] = [
    // Step 1: Welcome
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
    // Step 2: Create Button
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
    // Step 3: Snippets List
    {
        target: '#snippets-list',
        title: '📚 Your Snippet Collection',
        content: 'All your snippets here. Click on any card to copy or edit!',
        placement: 'top',
        disableBeacon: true,
    },
    // Step 4: Search
    {
        target: '#search-snippets',
        title: '🔍 Quick Search',
        content: 'Find any snippet instantly.',
        placement: 'bottom',
        disableBeacon: true,
    },

    // Step 5: Final
    {
        target: 'body',
        placement: 'center',
        title: '🎉 You\'re a Pro!',
        content: (

            <div className="text-center">
                <div className="text-4xl mb-4 animate-bounce flex justify-center items-center">✏️ <span className="hidden md:block">✨ 🎨</span></div>
                <p className="font-comic-bold whitespace-nowrap md:whitespace-normal text-lg mb-2">
                    Ready to speed up your typing?
                </p>
                <p className="text-sm">
                    Create your first snippet! Right Now.
                </p>

            </div>
        ),
        disableBeacon: true,
        hideFooter: true,
    },
];