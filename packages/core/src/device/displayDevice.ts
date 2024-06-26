import { ImageOptions } from '../image/imageOptions';

export enum ColorMode {
    Black = 'black',
    Gray4 = '4gray',
    Red = 'red',
}

export enum Orientation {
    Horizontal = 'h',
    Vertical = 'v',
}

export interface DisplayDevice {
    orientation: Orientation;
    readonly height: number;
    readonly width: number;
    colorMode: ColorMode;
    connect(): void;
    wake(): void;
    clear(): void;
    sleep(): void;
    displayPng(img: Buffer, options?: ImageOptions): Promise<void>;
    disconnect(): void;
}

export interface DisplayDeviceWRed {
    orientation: Orientation;
    readonly height: number;
    readonly width: number;
    connect(): void;
    wake(): void;
    clear(): void;
    sleep(): void;
    displayPng(img: Buffer, options?: ImageOptions): Promise<void>;
    displayPng2(img: Buffer, imgRed: Buffer, options?: ImageOptions, optionsRed?: ImageOptions): Promise<void>;
    disconnect(): void;
}
