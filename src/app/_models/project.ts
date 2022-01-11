export class Project {
    id: number = 0;
    name: string = '';
    description?: string;
    color: string = '#0d6efd';

    static isLightColor(c: string): boolean {
        c = c.substring(1);      // strip #
        let rgb = parseInt(c, 16);   // convert rrggbb to decimal
        let r = (rgb >> 16) & 0xff;  // extract red
        let g = (rgb >> 8) & 0xff;  // extract green
        let b = (rgb >> 0) & 0xff;  // extract blue

        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

        return luma > 200;
    }
}
