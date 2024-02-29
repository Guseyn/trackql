export function formatDuration(durationInMilliseconds: string): string {
    const durationInMillisecondsAsNumber = parseInt(durationInMilliseconds);
    const minutes: number = Math.floor(durationInMillisecondsAsNumber / (1000 * 60));
    const seconds: number = Math.floor((durationInMillisecondsAsNumber % (1000 * 60)) / 1000);

    return `${minutes}:${seconds}`;
}
