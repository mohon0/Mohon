export default function DecodeTitleFromUrl(encodedStr: string) {
  return decodeURIComponent(encodedStr.replace(/_/g, " "));
}
