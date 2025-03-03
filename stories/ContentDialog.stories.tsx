import type { Meta, StoryObj } from "@storybook/react";

import ContentDialog from "@/components/ContentDialog/ContentDialog";

const defaultArgs = {
  item: {
    id: 1,
    title: "The Matrix",
    posterImage: "https://placehold.co/200x400",
    backDropImage: "https://placehold.co/300x170",
    releaseYear: "1999",
    voteRating: 7,
    genre_ids: [1, 2],
    genres: [
      { id: 1, name: "Action" },
      { id: 2, name: "Sci-Fi" },
    ],
  },
};

const meta: Meta<typeof ContentDialog> = {
  title: "Components/ContentDialog",
  component: ContentDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    item: {
      description: "Content item to display in the dialog",
      control: "object",
    },
  },
  args: defaultArgs,
  decorators: [
    Story => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContentDialog>;

export const Default: Story = {
  args: defaultArgs,
};

export const WithMultipleGenres: Story = {
  args: {
    item: {
      ...defaultArgs.item,
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Sci-Fi" },
        { id: 3, name: "Thriller" },
        { id: 4, name: "Drama" },
        { id: 5, name: "Mystery" },
        { id: 6, name: "Adventure" },
      ],
    },
  },
};

export const LongTitle: Story = {
  args: {
    item: {
      ...defaultArgs.item,
      title: "The Lord of the Rings: The Fellowship of the Ring Extended Edition",
    },
  },
};

export const NoGenres: Story = {
  args: {
    item: {
      ...defaultArgs.item,
      genres: [],
    },
  },
};

export const SquarePoster: Story = {
  args: {
    item: {
      ...defaultArgs.item,
      backDropImage: "https://placehold.co/170x170",
    },
  },
};
