export function useDownload(data: Blob) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(data);
  a.setAttribute("download", "thumbnail.jpg");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}