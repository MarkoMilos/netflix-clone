import type {Meta, StoryObj} from '@storybook/react';

import Input from "@/components/Input";

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        id: {control: 'text'},
        type: {control: 'text'},
        value: {control: 'text'},
        label: {control: 'text'},
    },
    args: {
        id: "input",
        type: "text",
        value: "",
        label: "Label",
    },
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {}

export const Filled: Story = {
    args: {
        value: "Filled",
    }
}
