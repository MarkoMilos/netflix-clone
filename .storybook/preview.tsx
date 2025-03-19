import type { Preview } from "@storybook/react";
import "../app/globals.css";
import React from "react";

// Add styles to inject the Netflix Sans font directly in Storybook
const fontStyles = `
  @font-face {
    font-family: 'Netflix Sans';
    src: url('/fonts/NetflixSans-Light.otf') format('opentype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Netflix Sans';
    src: url('/fonts/NetflixSans-Regular.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Netflix Sans';
    src: url('/fonts/NetflixSans-Medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Netflix Sans';
    src: url('/fonts/NetflixSans-Bold.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  :root {
    --font-netflix-sans: 'Netflix Sans', ui-sans-serif, system-ui, sans-serif;
  }

  .storybook-font-wrapper {
    font-family: var(--font-netflix-sans);
  }
`;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <>
        <style>{fontStyles}</style>
        <div className="storybook-font-wrapper font-sans antialiased">
          <Story />
        </div>
      </>
    ),
  ],
};

export default preview;
