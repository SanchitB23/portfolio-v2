export const compact = <T>(array: T[] | undefined): T[] => {
  return array?.filter(Boolean) ?? [];
};
