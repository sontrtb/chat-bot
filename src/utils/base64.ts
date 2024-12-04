async function fileToBase64(file: File | Blob): Promise<string | ArrayBuffer | null> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

export { fileToBase64 };
