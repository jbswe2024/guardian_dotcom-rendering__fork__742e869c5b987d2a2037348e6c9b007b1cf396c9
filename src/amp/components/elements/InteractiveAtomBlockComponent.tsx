import React from 'react';
import { css } from 'emotion';
import { ShowMoreButton } from '@root/src/amp/components/ShowMoreButton';

const styles = (height: number) => css`
    height: ${height}px;
    width: 100%;
    margin-top: 16px;
    margin-bottom: 12px;
`;

const showMore = css`
    &[overflow] {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
`;

// We look in the html field of the atom for a hint
// for the height of the atom
// We look for an html comment <!-- MobileHeight: 100 -->
// and if we find it use that value for the CSS height of the atom
// otherwise we use a default height
const getHeight = (html?: string): number => {
    const defaultInteractiveAtomHeight = 100;
    if (html) {
        const heightRegex = /<!-- MobileHeight: (.*) -->/;
        const getHeightFromComment = heightRegex.exec(html);
        if (
            getHeightFromComment &&
            typeof Number(getHeightFromComment[1]) === 'number'
        ) {
            return Number(getHeightFromComment[1]); // Returns [ '<!-- MobileHeight: 100 -->', '100', index: 4, input: 'test<!-- MobileHeight: 100 -->', groups: undefined ]
        }
    }

    return defaultInteractiveAtomHeight;
};

export const InteractiveAtomBlockComponent: React.SFC<{
    url: string;
    html?: string;
    placeholderUrl?: string;
}> = ({ url, placeholderUrl, html }) => {
    // On Dot Com, Interactive Atoms are sometimes used to modify the page
    // around them. CSS, JS but no HTML can exist in an atom, and because we just
    // add it to the page, it can modify the world around it.
    // We can't do that on AMP, so if the html field of an interactive atom is an
    // empty string then we just want to walk away from it.
    if (html === '') {
        return null;
    }

    return (
        <amp-iframe
            class={styles(getHeight(html))}
            src={url}
            layout="responsive"
            sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups"
            height="1"
            width="1"
            resizable=""
            data-cy="atom-embed-url"
        >
            {placeholderUrl && (
                <amp-img
                    placeholder={true}
                    layout="fill"
                    src={placeholderUrl}
                />
            )}
            <div overflow="" className={showMore}>
                <ShowMoreButton />
            </div>
        </amp-iframe>
    );
};
