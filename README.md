# Create React App PostCSS [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Gitter Chat][git-img]][git-url]

[Create React App PostCSS] lets you use [PostCSS plugins] with
[Create React App] 1.x.

```bash
npm install create-react-app-postcss
```

Once installed, [Create React App PostCSS] lets you require the PostCSS
plugins you want to use **right in the code itself**.

```pcss
@use postcss-preset-env { stage: 0 }

h1 {
  margin: 0;

  @media (min-width: 768px) {
    margin-top: 1.875rem;
  }

  & a {
    text-decoration: none;
  }
}

/* becomes */

h1 {
  margin: 0;
}

@media (min-width: 768px) {
  h1 {
    margin-top: 1.875rem;
  }
}

h1 a {
  text-decoration: none;
}
```

This is the same technique adopted by [CodePen], which is powered by the
[PostCSS Use] plugin.

## How to use a plugin

Once [Create React App PostCSS] is installed, all you need to do is install a
plugin and require it directly from your CSS.

For example, if we want to embed SVGs into our CSS, we install the
[PostCSS SVG] plugin:

```bash
npm install postcss-svg
```

And then we require it from our CSS:

```pcss
@use postcss-svg;

.icon--square {
  content: url("shared-sprites#square" param(--color #639));
}
```

And our CSS will become:

```pcss
.icon--square {
  content: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect style='fill:#639' width='100%25' height='100%25'/%3E%3C/svg%3E");
}
```

That’s it. Now, go forth and make great stuff!

[npm-url]: https://www.npmjs.com/package/create-react-app-postcss
[npm-img]: https://img.shields.io/npm/v/create-react-app-postcss.svg
[cli-url]: https://travis-ci.org/jonathantneal/create-react-app-postcss
[cli-img]: https://img.shields.io/travis/jonathantneal/create-react-app-postcss.svg
[git-url]: https://gitter.im/postcss/postcss
[git-img]: https://img.shields.io/badge/chat-gitter-blue.svg

[CodePen]: https://blog.codepen.io/2015/07/14/postcss-now-supported-on-codepen/
[Create React App]: https://github.com/facebook/create-react-app
[Create React App PostCSS]: https://github.com/jonathantneal/create-react-app-postcss
[postcss]: https://github.com/postcss/postcss
[PostCSS plugins]: https://www.postcss.parts/
[PostCSS SVG]: https://github.com/jonathantneal/postcss-svg
[PostCSS Use]: https://github.com/postcss/postcss-use
