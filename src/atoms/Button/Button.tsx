import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. `primary` for the main action, `secondary` for everything beside it. */
  variant?: ButtonVariant;
  /** Control height and padding. */
  size?: ButtonSize;
  /** Stretch to fill the container. */
  fullWidth?: boolean;
  /** Shows a busy state and blocks interaction. */
  isLoading?: boolean;
  children: ReactNode;
}

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryText};
    border-color: ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
      border-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.secondaryBg};
    color: ${({ theme }) => theme.colors.secondaryText};
    border-color: ${({ theme }) => theme.colors.secondaryBorder};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.secondaryHover};
    }
  `,
} satisfies Record<ButtonVariant, ReturnType<typeof css>>;

const sizes = {
  sm: css`
    padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
    font-size: ${({ theme }) => theme.fontSizes.md};
  `,
} satisfies Record<ButtonSize, ReturnType<typeof css>>;

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.5;
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.durations.fast} ease,
    border-color ${({ theme }) => theme.durations.fast} ease;

  ${({ $size }) => sizes[$size]}
  ${({ $variant }) => variants[$variant]}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      {...rest}
      type={type}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled ?? isLoading}
      aria-busy={isLoading || undefined}
    >
      {children}
    </StyledButton>
  );
}
