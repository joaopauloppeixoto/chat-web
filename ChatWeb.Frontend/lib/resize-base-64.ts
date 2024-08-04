export const resizeBase64Img: any = (
  base64: string,
  newWidth: number,
  newHeight: number
) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;
    let context = canvas.getContext("2d");
    let img = document.createElement("img");
    img.src = base64;
    img.onload = function () {
      if (context) {
        context.scale(newWidth / img.width, newHeight / img.height);
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
      }
    };
  });
};
