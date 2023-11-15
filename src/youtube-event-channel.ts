const APP_TAG = 'yt-ad-muffler';

enum YoutubeEvent {
    OpenedVideoPage = `${APP_TAG}-video-page-open`,
    NextVideoPage = `${APP_TAG}-video-page-new`,
    ClosedVideoPage = `${APP_TAG}-video-page-close`,
    AdStart = `${APP_TAG}-ad-start`,
    AdPlaying = `${APP_TAG}-ad-playing`,
    AdNext = `${APP_TAG}-ad-next`,
    AdEnd = `${APP_TAG}-ad-end`,
}

export default class YoutubeEventChannel {
    private location: string | null = null;
    private videoId: string | null = null;
    private ytdPlayer: HTMLElement | null = null;
    private adId: string | null = null;
    private isRunningCheck: boolean = false;

    startListener() {
        this.setupPageChangeListeners();

        this.checkForPageChanges();
    }

    private setupPageChangeListeners() {
        let videoElementsWithListeners: HTMLVideoElement[] = [];

        const setupVideoListeners = () => {
            document.querySelectorAll('video').forEach(video => {
                if (videoElementsWithListeners.includes(video)) {
                    return;
                }

                videoElementsWithListeners.push(video);

                video.addEventListener('canplay', () => this.checkForPageChanges());
                video.addEventListener('canplaythrough', () => this.checkForPageChanges());
                video.addEventListener('playing', () => this.checkForPageChanges());
                video.addEventListener('pause', () => this.checkForPageChanges());
                video.addEventListener('emptied', () => this.checkForPageChanges());
            });
        };

        setupVideoListeners();

        document.addEventListener('yt-navigate-start', () => {
            setupVideoListeners();
            this.checkForPageChanges();
        });

        document.addEventListener('yt-navigate-finish', () => {
            setupVideoListeners();
            this.checkForPageChanges();
        });
    }

    private waitForYoutubePlayer(): Promise<HTMLElement | null> {
        return Promise.race([
            new Promise<HTMLElement>(resolve => {
                let ytdPlayer: HTMLElement | null = document.getElementById('ytd-player');

                // The ytd-player is loaded once the video element is also added to the DOM
                if (ytdPlayer?.querySelector('video')) {
                    return resolve(ytdPlayer);
                }

                const observer = new MutationObserver(() => {
                    if (!ytdPlayer) {
                        ytdPlayer = document.getElementById('ytd-player');
                    }

                    if (ytdPlayer?.querySelector('video')) {
                        observer.disconnect();
                        resolve(ytdPlayer);
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }),
            new Promise<null>(resolve => setTimeout(resolve, 10000, null)),
        ]);
    }

    private getYoutubeVideoId(): string | null {
        return (new URL(window.location.href)).searchParams.get('v');
    }

    private async checkForPageChanges(): Promise<void> {
        if (this.isRunningCheck) {
            return;
        }
        this.isRunningCheck = true;

        const currentLocation = window.location.href;

        if (currentLocation !== this.location) {
            const currentVideoId = this.getYoutubeVideoId();

            if (currentVideoId !== this.videoId) {
                if (this.videoId === null) {
                    this.ytdPlayer = await this.waitForYoutubePlayer();
                    this.dispatchYoutubeEvent(YoutubeEvent.OpenedVideoPage);
                } else if (currentVideoId === null) {
                    this.ytdPlayer = null;
                    this.dispatchYoutubeEvent(YoutubeEvent.ClosedVideoPage);
                } else {
                    this.dispatchYoutubeEvent(YoutubeEvent.NextVideoPage);
                }

                this.videoId = currentVideoId;
            }

            this.location = currentLocation;
        }

        if (!this.videoId) {
            this.isRunningCheck = false;
            return;
        }

        if (!this.ytdPlayer) {
            this.ytdPlayer = await this.waitForYoutubePlayer();

            if (!this.ytdPlayer) {
                this.isRunningCheck = false;
                return;
            }
        }

        const currentAdId = this.ytdPlayer
                .querySelector('.ytp-ad-visit-advertiser-button')
                ?.getAttribute('aria-label')
            ?? null;

        if (currentAdId !== this.adId) {
            if (this.adId === null) {
                this.dispatchYoutubeEvent(YoutubeEvent.AdStart);
            } else if (currentAdId === null) {
                this.dispatchYoutubeEvent(YoutubeEvent.AdEnd);
            } else {
                this.dispatchYoutubeEvent(YoutubeEvent.AdNext);
            }

            this.adId = currentAdId;
        }

        if (this.adId) {
            this.dispatchYoutubeEvent(YoutubeEvent.AdPlaying);
        }

        this.isRunningCheck = false;
    }

    private dispatchYoutubeEvent(tag: YoutubeEvent) {
        document.dispatchEvent(new CustomEvent(tag));
    }

    private addYoutubeEventListener(tag: YoutubeEvent, handler: () => void) {
        document.addEventListener(tag, () => {
            handler();
        });
    }

    getYoutubePlayer() {
        return this.ytdPlayer;
    }

    onOpenedVideoPage(handler: () => void) {
        this.addYoutubeEventListener(YoutubeEvent.OpenedVideoPage, () => handler());
    }

    onNextVideoPage(handler: () => void) {
        this.addYoutubeEventListener(YoutubeEvent.NextVideoPage, () => handler());
    }

    onClosedVideoPage(handler: () => void) {
        this.addYoutubeEventListener(YoutubeEvent.ClosedVideoPage, () => handler());
    }

    onAdStarted(handler: () => void) {
        this.addYoutubeEventListener(YoutubeEvent.AdStart, () => handler());
    }

    onAdPlaying(handler: () => void) {
        this.addYoutubeEventListener(YoutubeEvent.AdPlaying, () => handler());
    }

    onAdEnded(handler: () => void) {
        this.addYoutubeEventListener(YoutubeEvent.AdEnd, () => handler());
    }

    onNextAd(handler: () => void) {
        this.addYoutubeEventListener(YoutubeEvent.AdNext, () => handler());
    }
}
