const colors = {
    white: '\x1b[37m',
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    italic: '\x1b[3m',
    underline: '\x1b[4m',
    inverse: '\x1b[7m',
    hidden: '\x1b[8m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

class Color {
    private color: string;

    constructor(color: keyof typeof colors = 'reset') {
        this.color = colors[color];
    }
    text(...text: any) {
        console.log(`${this.color}${text.join(' ')}${colors.reset}`);
    }
    bold(...text: any) {
        console.log(`${this.color}${colors.bright}${text.join(' ')}${colors.reset}`);
    }
    dim(...text: any) {
        console.log(`${this.color}${colors.dim}${text.join(' ')}${colors.reset}`);
    }
    italic(...text: any) {
        console.log(`${this.color}${colors.italic}${text.join(' ')}${colors.reset}`);
    }
    underline(...text: any) {
        console.log(`${this.color}${colors.underline}${text.join(' ')}${colors.reset}`);
    }
    inverse(...text: any) {
        console.log(`${this.color}${colors.inverse}${text.join(' ')}${colors.reset}`);
    }
    boldItalic(...text: any) {
        console.log(
            `${this.color}${colors.bright}${colors.italic}${text.join(' ')}${colors.reset}`,
        );
    }
    boldUnderline(...text: any) {
        console.log(
            `${this.color}${colors.bright}${colors.underline}${text.join(' ')}${colors.reset}`,
        );
    }
}

class Chalk {
    public static readonly colors = colors;
    static readonly blue = new Color('blue');
    static readonly green = new Color('green');
    static readonly red = new Color('red');
    static readonly yellow = new Color('yellow');
    static readonly magenta = new Color('magenta');
    static readonly cyan = new Color('cyan');
    static readonly reset = new Color('reset');

    public static bold(text: any) {
        new Color('bright').bold(text);
    }
    public static dim(text: any) {
        new Color('dim').dim(text);
    }
    public static italic(text: any) {
        new Color('italic').italic(text);
    }
    public static underline(text: any) {
        new Color('underline').underline(text);
    }
    public static inverse(text: any) {
        new Color('inverse').inverse(text);
    }
}

export default Chalk;
