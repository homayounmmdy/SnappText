import Joyride from "react-joyride";
import PlayfulTooltip from "./PlayfulTooltip.tsx";
import Beacon from "./Beacon.tsx";
import {userJourneySteps} from "../config/userJourneySteps.tsx";

const UserJourney = () => {

    return (
        <Joyride
            steps={userJourneySteps}
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
                beacon: {
                    position: 'relative',
                    zIndex: 10001,
                },
            }}
            beaconComponent={Beacon}
            tooltipComponent={PlayfulTooltip}

        />
    );
};

export default UserJourney;
