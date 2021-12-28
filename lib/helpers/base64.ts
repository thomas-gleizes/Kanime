class Base64 {
  public static encode(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') resolve(reader.result.split(',')[1]);
        else reject('reader.result is not a string');
      };
      reader.onerror = (error) => reject(error);
    });
  }

  public static decode(data, extension) {
    return `data:${extension};base64,${data}`;
  }
}

export default Base64;
