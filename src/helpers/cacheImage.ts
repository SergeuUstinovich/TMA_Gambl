import localforage from 'localforage';

// Настройка localforage
localforage.config({
  name: 'imageCache',
  storeName: 'images',
});

// Функция для сохранения изображения в localforage
export const saveImageToCache = async (url: string, blob: Blob) => {
  await localforage.setItem(url, blob);
};

// Функция для получения изображения из localforage
export const getCachedImage = async (url: string): Promise<string | null> => {
  const blob = await localforage.getItem<Blob>(url);
  if (blob) {
    return URL.createObjectURL(blob);
  }
  return null;
};

