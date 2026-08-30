import type { Meta, StoryObj } from '@storybook/react-vite';

import { ColorSpecimen, RadiiSpecimen, SpaceSpecimen, TypeSpecimen } from './specimens';

const meta = {
  title: 'Tokens',
  parameters: {
    controls: { disable: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => <ColorSpecimen />,
};

export const Spacing: Story = {
  render: () => <SpaceSpecimen />,
};

export const Typography: Story = {
  render: () => <TypeSpecimen />,
};

export const Radii: Story = {
  render: () => <RadiiSpecimen />,
};
