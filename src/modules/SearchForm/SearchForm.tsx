import { useState, type FormEvent } from 'react';
import styled from 'styled-components';

import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';

export interface SearchFormProps {
  /** Controlled value. Omit to let the form manage its own state. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Fired on submit with the trimmed query. Never fired for an empty query. */
  onSearch: (query: string) => void;
  onClear?: () => void;
  /** Accessible label for the field and the landmark. */
  label?: string;
  placeholder?: string;
  /** Puts the submit button in a busy state and locks the field. */
  isLoading?: boolean;
  error?: string;
  disabled?: boolean;
}

const Form = styled.form`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.sm};
  width: 100%;
  max-width: 32rem;
`;

const FieldSlot = styled.div`
  flex: 1;
`;

export function SearchForm({
  value,
  defaultValue = '',
  onChange,
  onSearch,
  onClear,
  label = 'Search',
  placeholder = 'Search…',
  isLoading = false,
  error,
  disabled = false,
}: SearchFormProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const query = isControlled ? value : internalValue;

  const setQuery = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  const handleClear = () => {
    setQuery('');
    onClear?.();
  };

  return (
    <Form role="search" aria-label={label} onSubmit={handleSubmit}>
      <FieldSlot>
        <Input
          label={label}
          hideLabel
          fullWidth
          type="search"
          value={query}
          placeholder={placeholder}
          error={error}
          disabled={disabled || isLoading}
          onChange={(event) => setQuery(event.target.value)}
        />
      </FieldSlot>
      {query && (
        <Button variant="secondary" onClick={handleClear} disabled={disabled || isLoading}>
          Clear
        </Button>
      )}
      <Button type="submit" isLoading={isLoading} disabled={disabled}>
        {isLoading ? 'Searching…' : 'Search'}
      </Button>
    </Form>
  );
}
