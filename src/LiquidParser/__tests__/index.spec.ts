import { render } from '../index';
describe('Render Method Tests', () => {
    it('Render - Output should gives us the expected result', () => {
        const liquidExample = '<div>{{name}}</div>';
        const liquidOptions = {
            name: 'foo',
        };
        const expectedHTMLOutput = '<div>foo</div>';

        const result = render(liquidExample, liquidOptions);

        expect(result).toBe(expectedHTMLOutput);
    });
});
