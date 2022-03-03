# Storybook Liquid Render

This library was created originally to parse a liquid file, using an options object into an HTML output, just as Shopify does it, to use this output in Storybook.

To use alongside Storybook, you must:

-   Install Storybook

-   Install it using npm install

```sh
npm i -D storybook-liquid-render
```

-   Import it into your stories file and use it, like this:

```typescript
// Button.stories.ts

import { Story, Meta } from '@storybook/html';

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
    title: 'Example/Button',
    argTypes: {
        name: {
            control: 'text',
            default: 'foo',
        },
    },
} as Meta;

interface ButtonProps {
    name: string;
}

const Template: Story<ButtonProps> = (args) => {
    const liquidExample = '<button>{{name}}</button>';
    const options = {
        ...args,
    };

    // expectedHTMLOutput -> '<button>foo</button>';
    return render(liquidExample, liquidOptions);
};

export const Primary = Template.bind({});
Primary.args = {
    name: 'foo',
};
```

## Render Method:

The render method receives three arguments:

-   liquidContent: You Liquid string.
-   options: An object defining the variables present on the Liquid structure.
-   liquidObjectOptions: An object of the [liquidjs](https://github.com/harttle/liquidjs) constructor options.

The render method can't deal with Shopify specific filters or features unsupported by the [liquidjs](https://github.com/harttle/liquidjs). :(

## Important note: rendering snippets

-   Storybook runs on the client side / browser. It can't access your files, so it has no idea of your imported snippets.

To solve that you must extend the Storybook Express server and use a middleware plugin that enables finding child files as a GET request:

```javascript
...
const expressMiddleWare = function (router) {
    ...
    router.get('/file/:filename', function (req, res) {
        res.sendFile(path.resolve(__dirname, `path/to/your/snippets/${req.params.filename}.liquid`));
    });
};

...
```

After that you can use the root option in the third argument to enable Storybook to search for child files from a GET request:

```typescript
return render(liquidExample, liquidOptions, { root: './file' });
```

Hope that helps you in your Shopify/Liquid development! :)
