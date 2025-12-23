export default function startUpTimeFormat(time) {
    const formattedTime = time >= 1000 ? `${(time / 1000).toFixed(2)} s` : `${time.toFixed(2)} ms`;
    return formattedTime;
}
