const getBase64 = (files: FileList | null): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!files || files.length === 0) {
      return resolve('');
    }
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (!reader.result) {
        return resolve('');
      }
      resolve(reader.result.toString());
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
};

export default getBase64;
