import React from 'react';
import type { Category } from './types';
import {
    moviesPrompt,
    websitesPrompt,
    musicPrompt,
    storiesPrompt,
    techPrompt,
    asciiPrompt,
    socialPrompt,
    twitterPrompt,
} from './prompts';
import { useTranslations } from './hooks/useTranslations';

const FilmIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm1 2v2h2V5H5zm2 4H5v2h2V9zm2-4h2v2H9V5zm2 4H9v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" /></svg>
);
const WebIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.52-1.937c.364.116.706.278 1.013.472.33.214.504.62.423 1.02a6.012 6.012 0 01-1.912 2.706C13.488 10.27 13.026 10 12.5 10a1.5 1.5 0 01-1.5-1.5v-.5a2 2 0 00-4 0 2 2 0 01-1.52 1.937c-.364-.116-.706-.278-1.013-.472-.33-.214-.504.62-.423-1.02z" clipRule="evenodd" /></svg>
);
const MusicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V3z" /></svg>
);
const StoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 16c1.255 0 2.443-.29 3.5-.804V4.804zM14.5 4c1.255 0 2.443.29 3.5.804v10A7.969 7.969 0 0114.5 16c-1.255 0-2.443-.29-3.5-.804V4.804A7.968 7.968 0 0114.5 4z" /></svg>
);
const TechIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H9V3a1 1 0 00-1-1H7zM5 8h10v8H5V8z" clipRule="evenodd" /></svg>
);
const AsciiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.625 5.248a.75.75 0 00-1.25 0L1.5 11.25a.75.75 0 00.625 1.25h15.75a.75.75 0 00.625-1.25L14.625 5.248a.75.75 0 00-1.25 0L10 10.25l-3.375-5.002z" clipRule="evenodd" /></svg>
);
const SocialIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 1.046A9 9 0 0010 1 9 9 0 001 10a9 9 0 009 9 9 9 0 009-9 9 9 0 00-1-3.51V4.22A2.3 2.3 0 0015.776 2 2.3 2.3 0 0013.5 4.22v2.27a9.02 9.02 0 00-2.5-.446zM10 17a7 7 0 110-14 7 7 0 010 14z" /></svg>
);
const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" /></svg>
);


export const useCategories = (): Category[] => {
    const { t } = useTranslations();

    return [
        {
            id: 'movies',
            name: t('categories.movies'),
            icon: <FilmIcon />,
            prompt: moviesPrompt,
        },
        {
            id: 'websites',
            name: t('categories.websites'),
            icon: <WebIcon />,
            prompt: websitesPrompt,
        },
        {
            id: 'music',
            name: t('categories.music'),
            icon: <MusicIcon />,
            prompt: musicPrompt,
        },
        {
            id: 'stories',
            name: t('categories.stories'),
            icon: <StoryIcon />,
            prompt: storiesPrompt,
        },
        {
            id: 'tech',
            name: t('categories.tech'),
            icon: <TechIcon />,
            prompt: techPrompt,
        },
        {
            id: 'ascii',
            name: t('categories.ascii'),
            icon: <AsciiIcon />,
            prompt: asciiPrompt,
        },
        {
            id: 'social',
            name: t('categories.social'),
            icon: <SocialIcon />,
            prompt: socialPrompt,
        },
        {
            id: 'twitter',
            name: t('categories.twitter'),
            icon: <TwitterIcon />,
            prompt: twitterPrompt,
        },
    ];
};