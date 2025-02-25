import type { Meta, StoryObj } from "@storybook/react";

import ContentCard from "@/components/ContentCard/ContentCard";

const meta: Meta<typeof ContentCard> = {
  title: "Components/ContentCard",
  component: ContentCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    item: { control: "object" },
  },
  args: {
    item: {
      contentId: 1,
      contentTitle: "The Shawshank Redemption",
      contentPosterImage: "https://image.tmdb.org/t/p/original/avedvodAZUcwqevBfm8p4G2NziQ.jpg",
      contentYear: 1994,
      contentRating: 9.3,
    },
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div style={{ width: "300px", aspectRatio: "16/9" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
