export function getValueByPath(obj: Object, path: string) {
  const paths = path.split('.');
  let res = obj as Object;

  for (const p of paths) {
    res = res[p as keyof typeof res];
  }

  return res;
}
export function capitalizeAndOmitUnderscore(str: string) {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
