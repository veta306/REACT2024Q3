export function imageToBase64(img: File): Promise<string> {
  const reader = new FileReader();

  reader.readAsDataURL(img);
  return new Promise((resolve) => {
    reader.onload = () => {
      resolve(reader.result as string);
    };
  });
}
