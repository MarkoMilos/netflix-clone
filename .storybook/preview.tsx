import type { Preview } from "@storybook/react";

import "../app/globals.css";
import netflixSans from "../lib/fonts";

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
      <div className={`${netflixSans.variable} font-sans antialiased`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
