import { DisplayDeviceWRed, Monochrome, Orientation } from '@epaperjs/core';
import { ImageOptions } from '@epaperjs/core/src/image/imageOptions';
import bindings from 'bindings';
import { Driver } from './driver';

export class Rpi7In5BV2 implements DisplayDeviceWRed {
    public readonly height: number;
    public readonly width: number;
    private readonly driver: Driver;
    private sleeping = true;
    constructor(public readonly orientation = Orientation.Horizontal) {
        this.driver = bindings('waveshare7in5bv2');
        this.width = this.orientation === Orientation.Horizontal ? 800 : 480;
        this.height = this.orientation === Orientation.Horizontal ? 480 : 800;
    }

    public connect(): void {
        this.driver.dev_init();
        this.wake();
    }

    public disconnect(): void {
        this.sleep();
        this.driver.dev_exit();
    }

    public wake(): void {
        this.driver.init();
        this.sleeping = false;
    }

    public clear(): void {
        this.driver.clear();
    }

    public sleep(): void {
        if (!this.sleeping) {
            this.driver.sleep();
            this.sleeping = true;
        }
    }

    public async displayPng(img: Buffer, options?: ImageOptions): Promise<void> {
        const converter = new Monochrome(img);
        const blackBuffer = await converter.toBlack({
            ...options,
            rotate90Degrees: this.orientation === Orientation.Vertical,
        });

        const redBuffer = Buffer.from([])


        this.driver.display(blackBuffer, redBuffer);
    }

    public async displayPng2(img: Buffer, imgRed: Buffer, options?: ImageOptions, optionsRed?: ImageOptions): Promise<void> {
        const converter = new Monochrome(img);
        const blackBuffer = await converter.toBlack({
            ...options,
            rotate90Degrees: this.orientation === Orientation.Vertical,
        });


        const converterRed = new Monochrome(imgRed);
        const redBuffer = await converterRed.toRed({ ...optionsRed, rotate90Degrees: this.orientation === Orientation.Horizontal })


        this.driver.display(blackBuffer, redBuffer);
    }
}
