function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result.split(',')[1]);
      } else if (result instanceof ArrayBuffer) {
        const base64 = btoa(String.fromCharCode(...new Uint8Array(result)));
        resolve(base64);
      } else {
        reject(new Error('Unsupported FileReader result type'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default readFileAsBase64;
