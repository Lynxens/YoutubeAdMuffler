import YoutubeEventChannel from "./youtube-event-channel";

async function setupAdMuffler() {
    const youtubeEventChannel = new YoutubeEventChannel();
    let youtubePlayer: HTMLElement|null = null;
    let isDullingAd = false;

    youtubeEventChannel.onOpenedVideoPage(async () => {
        youtubePlayer = youtubeEventChannel.getYoutubePlayer();
    });

    youtubeEventChannel.onClosedVideoPage(async () => {
        youtubePlayer = null;
    });

    youtubeEventChannel.onAdStarted(() => {
        startAdMuffling();
    });

    youtubeEventChannel.onAdPlaying(() => {
        if (!isDullingAd) {
            startAdMuffling();
        }

        trySkipAd();
    });

    youtubeEventChannel.onNextAd(() => {
        isDullingAd = false;
        startAdMuffling();
    });

    youtubeEventChannel.onAdEnded(() => {
        stopAdMuffling();
    });

    youtubeEventChannel.startListener();

    function videoIsMuted(): boolean {
        return (<HTMLDivElement|null>youtubePlayer?.querySelector('.ytp-volume-slider-handle'))?.style.left === '0px';
    }

    function toggleMuteVideo() {
        (<HTMLButtonElement|null>youtubePlayer?.querySelector('.ytp-mute-button'))?.click();
    }

    function startAdMuffling() {
        if (!youtubePlayer) {
            return;
        }

        if (!videoIsMuted()) {
            toggleMuteVideo();
        }

        const video = youtubePlayer.querySelector('video');

        if (video) {
            video.style.filter = 'grayscale(1) brightness(0.2)';
            video.playbackRate = 16;
        }

        isDullingAd = true;
    }

    function stopAdMuffling() {
        if (!youtubePlayer) {
            return;
        }

        if (videoIsMuted()) {
            toggleMuteVideo();
        }

        const video = youtubePlayer.querySelector('video');
        if (video) {
            video.style.filter = 'none';
            video.playbackRate = 1;
        }

        isDullingAd = false;
    }

    function trySkipAd() {
        if (!youtubePlayer) {
            return;
        }

        (<HTMLButtonElement|null>youtubePlayer.querySelector('button.ytp-ad-skip-button-modern'))?.click();
    }
}
setupAdMuffler();
