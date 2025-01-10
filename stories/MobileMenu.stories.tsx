import type { Meta, StoryObj } from "@storybook/react";

import MobileMenu from "@/components/MobileMenu";

const meta: Meta<typeof MobileMenu> = {
  title: "Components/MobileMenu",
  component: MobileMenu,
  parameters: {
    docs: {
      story: {
        height: "300px",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
  },
  args: {
    className: "",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
