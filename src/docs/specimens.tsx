import styled, { useTheme } from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: ${({ theme }) => theme.space.lg};
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.colors.text};
`;

const Chip = styled.div<{ $color: string }>`
  height: 3rem;
  background: ${({ $color }) => $color};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const Name = styled.div`
  margin-top: ${({ theme }) => theme.space.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Value = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-variant-numeric: tabular-nums;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.colors.text};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 5rem 6rem 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};
`;

const Bar = styled.div<{ $size: string }>`
  width: ${({ $size }) => $size};
  height: 1rem;
  min-width: 2px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

/** Every semantic colour in the active theme. Flip the toolbar to compare. */
export function ColorSpecimen() {
  const theme = useTheme();

  return (
    <Grid>
      {Object.entries(theme.colors).map(([name, value]) => (
        <div key={name}>
          <Chip $color={value} />
          <Name>{name}</Name>
          <Value>{value}</Value>
        </div>
      ))}
    </Grid>
  );
}

export function SpaceSpecimen() {
  const theme = useTheme();

  return (
    <Rows>
      {Object.entries(theme.space).map(([name, value]) => (
        <Row key={name}>
          <Name>{name}</Name>
          <Value>{value}</Value>
          <Bar $size={value} />
        </Row>
      ))}
    </Rows>
  );
}

export function RadiiSpecimen() {
  const theme = useTheme();

  return (
    <Grid>
      {Object.entries(theme.radii).map(([name, value]) => (
        <div key={name}>
          <Chip $color={theme.colors.primary} style={{ borderRadius: value }} />
          <Name>{name}</Name>
          <Value>{value}</Value>
        </div>
      ))}
    </Grid>
  );
}

const Sample = styled.div<{ $size: string; $weight: number }>`
  font-size: ${({ $size }) => $size};
  font-weight: ${({ $weight }) => $weight};
  line-height: 1.4;
`;

export function TypeSpecimen() {
  const theme = useTheme();

  return (
    <Rows>
      {Object.entries(theme.fontSizes).map(([name, value]) => (
        <Row key={name}>
          <Name>{name}</Name>
          <Value>{value}</Value>
          <Sample $size={value} $weight={theme.fontWeights.regular}>
            Search the docs
          </Sample>
        </Row>
      ))}
      {Object.entries(theme.fontWeights).map(([name, value]) => (
        <Row key={name}>
          <Name>{name}</Name>
          <Value>{value}</Value>
          <Sample $size={theme.fontSizes.md} $weight={value}>
            Search the docs
          </Sample>
        </Row>
      ))}
    </Rows>
  );
}
