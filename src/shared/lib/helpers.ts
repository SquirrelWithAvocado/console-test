export function getColorFromProportion(value: number) {
    if (value > 0.8) {
        return '#F54B46';
    } else if (value > 0.5) {
        return '#EEE150';
    } else {
        return '#4FD1C5';
    }
}