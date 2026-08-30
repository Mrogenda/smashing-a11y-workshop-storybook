import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    children: 'Search',
    onClick: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The primary action element. `primary` carries the brand green; `secondary` is an outlined companion for lower-weight actions.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Clear' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Loading: Story = {
  args: { isLoading: true, children: 'Searching…' },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

/** Every variant against every state, so regressions in either theme are obvious. */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(4, max-content)' }}>
      {(['primary', 'secondary'] as const).map((variant) =>
        (['md', 'sm'] as const).map((size) => (
          <div key={`${variant}-${size}`} style={{ display: 'contents' }}>
            <Button {...args} variant={variant} size={size}>
              Default
            </Button>
            <Button {...args} variant={variant} size={size} disabled>
              Disabled
            </Button>
            <Button {...args} variant={variant} size={size} isLoading>
              Loading
            </Button>
            <Button {...args} variant={variant} size={size} fullWidth>
              Full width
            </Button>
          </div>
        )),
      )}
    </div>
  ),
};
