export function getValueByPath(obj: Object, path: string) {
  const paths = path.split('.');
  let res = obj as Object;

  for (const p of paths) {
    res = res[p as keyof typeof res];
  }

  return res;
}
