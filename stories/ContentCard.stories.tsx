import type { Meta, StoryObj } from "@storybook/react";

import ContentCard from "@/components/ContentCard";

const meta: Meta<typeof ContentCard> = {
  title: "Components/ContentCard",
  component: ContentCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    content: { control: "object" },
  },
  args: {
    content: {
      id: 1,
      title: "The Shawshank Redemption",
      posterImage: "https://placehold.co/300x450",
      backDropImage: "https://placehold.co/400x200",
      releaseYear: "1994",
      voteRating: 9.3,
      overview:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
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
