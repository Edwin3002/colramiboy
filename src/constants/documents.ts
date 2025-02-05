export enum documentsNames {
  CC = "cc",
  PASSPORT = "passport",
}

export const typeDocuments = {
  [documentsNames.CC]: {
    type: documentsNames.CC,
    name: "Cédula",
  },
  [documentsNames.PASSPORT]: {
    type: documentsNames.PASSPORT,
    name: "Pasaporte",
  },
};
