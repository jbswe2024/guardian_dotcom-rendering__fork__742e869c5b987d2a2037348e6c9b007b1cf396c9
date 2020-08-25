import React from 'react';
import ReactDOM from 'react-dom';

import { App } from '@root/src/web/components/App';
import { ABProvider } from '@guardian/ab-react';
import { tests } from '@frontend/web/experiments/ab-tests';
import { getCookie } from '@frontend/web/browser/cookie';
import { getForcedParticipationsFromUrl } from '@frontend/web/lib/getAbUrlHash';
import { Consent } from './Consent';

type Props = {
    CAPI: CAPIBrowserType;
    NAV: NavType;
};

export const HydrateApp = ({ CAPI, NAV }: Props) => {
    const mvtId = Number(
        (CAPI.config.isDev && getCookie('GU_mvt_id_local')) || // Simplify localhost testing by creating a different mvt id
            getCookie('GU_mvt_id'),
    );
    if (!mvtId) {
        // 0 is default and falsy here
        // eslint-disable-next-line no-console
        console.log('There is no MVT ID set, see HydrateApp.tsx');
    }

    const ophanRecordFunc =
        window &&
        window.guardian &&
        window.guardian.ophan &&
        window.guardian.ophan.record;

    const windowHash = window && window.location && window.location.hash;

    ReactDOM.render(
        <ABProvider
            arrayOfTestObjects={tests}
            abTestSwitches={{
                ...{ abAbTestTest: true }, // Test switch, used for Cypress integration test
                ...CAPI.config.switches,
            }}
            pageIsSensitive={CAPI.config.isSensitive}
            mvtMaxValue={1000000}
            mvtId={mvtId}
            ophanRecord={ophanRecordFunc}
            forcedTestVariants={getForcedParticipationsFromUrl(windowHash)}
        >
            <App CAPI={CAPI} NAV={NAV} />
            <Consent CAPI={CAPI} />
        </ABProvider>,

        document.getElementById('react-root'),
    );
};
