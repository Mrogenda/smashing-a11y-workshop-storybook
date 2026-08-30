import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { SearchForm } from './SearchForm';

const meta = {
  title: 'Modules/SearchForm',
  component: SearchForm,
  args: {
    onSearch: fn(),
    onChange: fn(),
    onClear: fn(),
    placeholder: 'Search the docs…',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Composes the `Input` and `Button` atoms into a search landmark. Controlled when `value` is supplied, otherwise it manages its own state. Submitting trims the query and skips empty input entirely.',
      },
    },
  },
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithQuery: Story = {
  args: { defaultValue: 'design tokens' },
};

export const Loading: Story = {
  args: { defaultValue: 'design tokens', isLoading: true },
};

export const WithError: Story = {
  args: { defaultValue: 'ab', error: 'Enter at least three characters.' },
};

export const Disabled: Story = {
  args: { defaultValue: 'design tokens', disabled: true },
};

export const SubmitsQuery: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole('searchbox'), 'design tokens');
    await userEvent.click(canvas.getByRole('button', { name: 'Search' }));

    await expect(args.onSearch).toHaveBeenCalledWith('design tokens');
  },
};

export const SubmitsOnEnter: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole('searchbox'), 'storybook{Enter}');

    await expect(args.onSearch).toHaveBeenCalledWith('storybook');
  },
};

/** Whitespace-only input is not a search. */
export const IgnoresEmptySubmit: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole('searchbox'), '   ');
    await userEvent.click(canvas.getByRole('button', { name: 'Search' }));

    await expect(args.onSearch).not.toHaveBeenCalled();
  },
};

/** Clear only appears once there is something to clear. */
export const ClearsQuery: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const field = canvas.getByRole('searchbox');

    await expect(canvas.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();

    await userEvent.type(field, 'design tokens');
    await userEvent.click(canvas.getByRole('button', { name: 'Clear' }));

    await expect(field).toHaveValue('');
    await expect(args.onClear).toHaveBeenCalled();
  },
};
