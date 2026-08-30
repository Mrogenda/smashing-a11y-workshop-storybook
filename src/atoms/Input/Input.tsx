import { useId, type InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Required — every field in the system is labelled. */
  label: string;
  /** Keep the label for assistive tech but hide it visually. */
  hideLabel?: boolean;
  /** Supporting text shown below the field. */
  hint?: string;
  /** Error message. Its presence marks the field invalid. */
  error?: string;
  /** Stretch to fill the container. */
  fullWidth?: boolean;
}

const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

const Field = styled.div<{ $fullWidth: boolean }>`
  display: inline-flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  font-family: ${({ theme }) => theme.fontFamily};
`;

const Label = styled.label<{ $hidden: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  ${({ $hidden }) => $hidden && visuallyHidden}
`;

const StyledInput = styled.input<{ $invalid: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.5;
  transition: border-color ${({ theme }) => theme.durations.fast} ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme, $invalid }) =>
      $invalid ? theme.colors.danger : theme.colors.borderStrong};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 1px;
    border-color: transparent;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }
`;

const Message = styled.p<{ $tone: 'muted' | 'danger' }>`
  margin: 0;
  color: ${({ theme, $tone }) => ($tone === 'danger' ? theme.colors.danger : theme.colors.textMuted)};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export function Input({
  label,
  hideLabel = false,
  hint,
  error,
  fullWidth = false,
  id,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ');

  return (
    <Field $fullWidth={fullWidth}>
      <Label htmlFor={inputId} $hidden={hideLabel}>
        {label}
      </Label>
      <StyledInput
        {...rest}
        id={inputId}
        $invalid={Boolean(error)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
      />
      {hint && (
        <Message id={hintId} $tone="muted">
          {hint}
        </Message>
      )}
      {error && (
        <Message id={errorId} $tone="danger" role="alert">
          {error}
        </Message>
      )}
    </Field>
  );
}
