import type {Meta, StoryObj} from '@storybook/react';
import AccountMenu from "@/components/AccountMenu";

const meta: Meta<typeof AccountMenu> = {
    title: 'Components/AccountMenu',
    component: AccountMenu,
    parameters: {
        docs: {
            story: {
                height: '300px',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        visible: {control: 'boolean'},
    },
    args: {
        visible: true,
    },
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {}
