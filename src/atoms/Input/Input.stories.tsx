import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Input } from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  args: {
    label: 'Search',
    placeholder: 'Search the docs…',
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'A labelled text field. The label is required; `hideLabel` hides it visually while keeping it for assistive tech. `hint` and `error` are wired up via `aria-describedby`.',
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: 'design tokens' },
};

export const WithHint: Story = {
  args: { hint: 'Press Enter to search.' },
};

export const WithError: Story = {
  args: { defaultValue: '??', error: 'Enter at least three characters.' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'design tokens' },
};

/** The label is still announced — inspect the accessibility tree to confirm. */
export const HiddenLabel: Story = {
  args: { hideLabel: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};
