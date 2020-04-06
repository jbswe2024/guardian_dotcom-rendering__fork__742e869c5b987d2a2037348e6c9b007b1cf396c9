import React, { FC, ReactElement } from 'react';
import { css } from '@emotion/core';
import { neutral } from '@guardian/src-foundations';

export interface VideoProps {
    src: string;
    width: string;
    height: string;
}

const videoStyles = css`
    background: ${neutral[97]};
    padding-bottom: 56.25%;
    width: 100%;
    position: relative;
    overflow: hidden;

    iframe {
        border: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
`;

const Video: FC<VideoProps> = ({ src, width, height }: VideoProps): ReactElement =>
    <div css={videoStyles}>
        <iframe src={src} height={height} width={width} title="Video element"/>
    </div>

export default Video;