import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { IconButton } from '@mui/material';
const Container = styled.div`
    width: 100%;
    position: relative;
    height: 100%;
    .play-btn {
        position: absolute;
        z-index: 10;
        color: white;
        font-size: 2rem;
        opacity: 0;
        transition: 500ms;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    &.paused {
        .play {
            opacity: 1;
        }
    }
    &:not(.paused) {
        .pause {
            opacity: 1;
        }
    }
`;
const Video = styled.video`
    width: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: cover;
`;
const ProfileVideo = ({ url, postID }) => {
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const handlePlayAndPause = e => {
        videoContainerRef.current?.classList.toggle(
            'paused',
            videoContainerRef.current?.paused
        );
    };
    const togglePlay = e => {
        videoRef.current?.paused
            ? videoRef.current.play()
            : videoRef.current.pause();
    };

    useEffect(() => {
        videoRef.current?.addEventListener('mouseenter', togglePlay);
        videoRef.current?.addEventListener('mouseleave', togglePlay);
        videoRef.current?.addEventListener('play', handlePlayAndPause);
        videoRef.current?.addEventListener('pause', handlePlayAndPause);
        return () => {
            videoRef.current?.removeEventListener('play', handlePlayAndPause);
            videoRef.current?.removeEventListener('pause', handlePlayAndPause);
            videoRef.current?.removeEventListener('mouseenter', togglePlay);
            videoRef.current?.removeEventListener('mouseleave', togglePlay);
        };
    }, [videoRef]);
    return (
        <Container
            ref={videoContainerRef}
            className='paused'
        >
            <IconButton
                className='play-btn play'
                onClick={togglePlay}
            >
                {' '}
                <BsFillPlayFill />{' '}
            </IconButton>
            <IconButton
                className='play-btn pause'
                onClick={togglePlay}
            >
                {' '}
                <BsFillPauseFill />{' '}
            </IconButton>
            <Video
                ref={videoRef}
                src={url}
            />
            ;
        </Container>
    );
};

export default ProfileVideo;
