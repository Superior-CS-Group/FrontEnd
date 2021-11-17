export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      resolve(e.target.result);
    };
    reader.readAsDataURL(file);
  });