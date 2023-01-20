export function generateMockEntities<Type = Record<string, unknown>>(
  entity: Type,
  additionalPropName?: string,
  arrayLength = 20
): (Type & { id: string })[] {
  return Array(arrayLength)
    .fill('someItem')
    .map(() => ({
      ...entity,
      id: `${Math.floor(Math.random() * 10000000)}`,
      ...(additionalPropName
        ? {
            [additionalPropName]: `${additionalPropName}_${(Math.random() + 1)
              .toString(24)
              .substring(7)}`,
          }
        : {}),
    }));
}
