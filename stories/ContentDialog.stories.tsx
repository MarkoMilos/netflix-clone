import type { Meta, StoryObj } from "@storybook/react";

import { ContentDialog } from "@/components/ContentDialog";

const defaultArgs = {
  content: {
    id: 1,
    title: "The Matrix",
    overview:
      "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
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
    content: {
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
    content: {
      ...defaultArgs.content,
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
    content: {
      ...defaultArgs.content,
      title: "The Lord of the Rings: The Fellowship of the Ring Extended Edition",
    },
  },
};

export const NoGenres: Story = {
  args: {
    content: {
      ...defaultArgs.content,
      genres: [],
    },
  },
};

export const SquarePoster: Story = {
  args: {
    content: {
      ...defaultArgs.content,
      backDropImage: "https://placehold.co/170x170",
    },
  },
};
