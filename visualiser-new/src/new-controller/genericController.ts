import { Timeline, Runner } from '@svgdotjs/svg.js';

// controls todo:
// [x] play/pause
// [ ] step to the next or previous timestamp in the current timeline
// [ ] run a sequence in step mode or sequential mode
// [ ] control to skip the animation of a sequence

// eventually this file should be placed in a folder common for all data structures,
// not just for the linked list
class AnimationController {
    private currentTimeline: Timeline = new Timeline().persist(true);
    private timelineDuration: number = 0;
    private slider: HTMLInputElement = document.querySelector('#timelineSlider') as HTMLInputElement;
    private timestamps: number[] = [];

    public getCurrentTimeline(): Timeline {
        return this.currentTimeline;
    }

    public constructTimeline(animationSequence: Runner[]) {
        this.currentTimeline = new Timeline().persist(true);
        this.timestamps = [];
        this.timelineDuration = 0;
        
        for (let i = 0; i < animationSequence.length; i++) {
            animationSequence[i].during(() => {
                // progress corresponds to how many ms have passed in the animation
                const progress = animationSequence[i].progress() * animationSequence[i].duration();
                this.slider.value = String(((this.timestamps[i] + progress) / this.timelineDuration) * 100);
            });

            this.currentTimeline.schedule(animationSequence[i]);
            this.timestamps.push(this.timelineDuration);
            this.timelineDuration += animationSequence[i].duration();
        }

        this.currentTimeline.play();
    }

    public play(): void {
        this.currentTimeline.play();
    }

    public pause(): void {
        this.currentTimeline.pause();
    }

    public seekPercent(position: number): void {
        const timeSeek: number = (position * this.timelineDuration) / 100;

        this.currentTimeline.time(timeSeek);
    }

    public setSpeed(speed: number): void {
        this.currentTimeline.speed(speed);
    }

    // Finish playing the timeline
    public finish(): void {
        this.currentTimeline.finish();
    }
}

export default AnimationController;