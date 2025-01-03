import type { Meta, StoryObj } from "@storybook/react";

import ContentCard from "@/components/ContentCard";

const meta: Meta<typeof ContentCard> = {
  title: "Components/ContentCard",
  component: ContentCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    movie: { control: "object" },
  },
  args: {
    movie: {
      id: "6734be98105f60429ddc2574",
      title: "We Are Going On Bullrun",
      description:
        "The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500, and posting a video from the road every single day!",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      thumbnailUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg",
      genre: "Adventure",
      duration: "0:47",
    },
  },
  decorators: [
    Story => (
      <div style={{ width: "300px", height: "200px", margin: "50px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
