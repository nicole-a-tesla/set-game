
export enum SUITE {
    DIAMOND = "diamond",
    SQUIGGLE = "squiggle",
    PILL = "pill"
}

export enum FILL {
  NONE = "none",
  PARTIAL = "partial",
  FULL = "full"
}

export enum COLOR {
    RED = "#e40707",
    GREEN = "#54b946",
    PURPLE = "#7701b7"
}

export enum COUNT {
    ONE = "1",
    TWO = "2",
    THREE ="3"
}

export interface CardData {
    id: string;
    suite: SUITE;
    count: COUNT;
    fill: FILL;
    color: COLOR;
}