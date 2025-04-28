export const unixToDate = (unix: number) => {
    const date = new Date(unix * 1000);
    return date.toLocaleDateString();
}

