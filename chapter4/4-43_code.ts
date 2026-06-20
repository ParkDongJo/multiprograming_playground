import { fx } from "../common/FxIterable";
import { toAsync } from "../common/toAsync";

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image from ${url}`));
    img.src = url;
  });
}

async function calcTotalHeight(urls: string[]): Promise<number> {
  try {
    const totalHeight = await fx(urls)
      .toAsync()
      .map(loadImage)
      .map(img => img.height)
      .reduce((a, b) => a + b, 0);
    return totalHeight;
  } catch (e) {
    return 0;
  }
}

// 에러 처리를 위임
const getTotalHeight = (urls: string[]) => fx(toAsync(urls))
  .map(loadImage)
  .map(img => img.height)
  .reduce((a, b) => a + b, 0);


const calcTotalHeight2 = async (urls: string[]) => {
  try {
    return await getTotalHeight(urls);
  } catch (e) {
    return 0;
  }
}

calcTotalHeight2();
