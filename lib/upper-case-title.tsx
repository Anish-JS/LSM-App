export const upperCaseTitle = (title: string) => {
  const wordsOfTitle = title.split(" ");
  let strTitle = "";
  wordsOfTitle.forEach((word) => {
    strTitle += word[0].toUpperCase() + word.slice(1) + " ";
  });

  return strTitle;
};
