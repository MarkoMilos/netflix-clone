import type { Meta, StoryObj } from "@storybook/react";

import ProfileItem from "@/components/ProfileItem";

const meta: Meta<typeof ProfileItem> = {
  title: "Components/ProfileItem",
  component: ProfileItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    profile: { control: "object" },
  },
  args: {
    profile: {
      id: "1",
      name: "Profile Name",
      image: "/images/profile1.png",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
