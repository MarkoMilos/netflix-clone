import type { Meta, StoryObj } from "@storybook/react";

import MovieCard from "@/components/MovieCard";

const meta: Meta<typeof MovieCard> = {
  title: "Components/MovieCard",
  component: MovieCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    movie: { control: "object" },
  },
  args: {
    movie: {
      id: "1",
      title: "Movie Title",
      thumbnailUrl: "https://picsum.photos/500/300",
      description: "Movie Description",
      videoUrl: "https://example.com/video.mp4",
      genre: "Action",
      duration: "120",
    },
  },
  decorators: [
    Story => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoPoster: Story = {
  args: {
    // @ts-expect-error - use default args and override posterUrl
    movie: {
      ...meta.args!.movie,
      thumbnailUrl: "",
    },
  },
};
