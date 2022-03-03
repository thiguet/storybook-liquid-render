import { Liquid } from 'liquidjs';
import { LiquidOptions } from 'liquidjs/dist/liquid-options';

export const render = (liquidContent: string, options: object, liquidObjectOptions: LiquidOptions = {}): string => {
    const engine = new Liquid(liquidObjectOptions);
    return engine.parseAndRenderSync(liquidContent, {
        ...options,
    });
};
