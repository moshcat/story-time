export const getBookmark = () => {
  const { $locally } = useNuxtApp();
  const bookmark = JSON.parse($locally.getItem("bookmark") || "[]");
  return Array.isArray(bookmark) ? bookmark : [];
};

export const setBookmark = (bookmark: any) => {
  const { $locally } = useNuxtApp();

  $locally.setItem("bookmark", JSON.stringify(bookmark));
};

export const toggleBookmark = (story: any) => {
  let bookmark = getBookmark();
  const index = bookmark.findIndex((item: any) => item.id === story.id);
  if (index === -1) {
    bookmark.push(story);
  } else {
    bookmark.splice(index, 1);
  }
  setBookmark(bookmark);
  return bookmark;
};

export const removeBookmark = (story: any) => {
  let bookmark = getBookmark();
  const index = bookmark.findIndex((item: any) => item.id === story.id);
  if (index !== -1) {
    bookmark.splice(index, 1);
  }
  setBookmark(bookmark);
  return bookmark;
};
export const clearBookmark = () => {
  const { $locally } = useNuxtApp();

  $locally.removeItem("bookmark");
};
