export default function IsFunctionEmpty(func) {
  const funcStr = func.toString();
  const body = funcStr.slice(funcStr.indexOf('{') + 1, funcStr.lastIndexOf('}') + 1).trim();
  return body.length === 0;
}
