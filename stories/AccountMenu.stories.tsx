import type { Meta, StoryObj } from "@storybook/react";

import AccountMenu from "@/components/AccountMenu";

const meta: Meta<typeof AccountMenu> = {
  title: "Components/AccountMenu",
  component: AccountMenu,
  tags: ["autodocs"],
  argTypes: {
    profiles: { control: "object" },
    currentProfile: { control: "object" },
    className: { control: "text" },
  },
  args: {
    profiles: [
      {
        id: "1",
        name: "John Doe",
        image: "/images/profile1.png",
      },
      {
        id: "2",
        name: "Kids",
        image: "/images/profile-kids.png",
      },
    ],
    currentProfile: {
      id: "1",
      name: "John Doe",
      image: "/images/profile1.png",
    },
    className: "",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
