export const generateMockEntities = <Type = Record<string, unknown>>(
  entity: Type,
  additionalPropNames?: string[],
  arrayLength = 20
): (Type & { id: string })[] => {
  return Array(arrayLength)
    .fill('someItem')
    .map(() => ({
      ...entity,
      id: `${Math.floor(Math.random() * 10000000)}`,
      ...Object.fromEntries(
        additionalPropNames?.length
          ? additionalPropNames.map((name) => [
              name,
              `${name}_${(Math.random() + 1).toString(24).substring(7)}`,
            ])
          : []
      ),
    }));
};
