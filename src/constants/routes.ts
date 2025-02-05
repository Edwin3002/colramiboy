export enum routersNames {
  HOME = "home",
  LOGIN = "login",
  REGISTER = "register",
  PROJECTS = "projects",
  EVENTS = "events",
  HISTORY = "history",
  MEMBERS = "members",
  INVITATION = "invitation",
}

export const routes = {
  [routersNames.HOME]: {
    route: routersNames.HOME,
    name: "Inicio",
  },
  [routersNames.INVITATION]: {
    route: routersNames.INVITATION,
    name: "Invitactión",
  },
  [routersNames.REGISTER]: { route: routersNames.REGISTER, name: "Registo" },
  [routersNames.LOGIN]: { route: routersNames.LOGIN, name: "Perfil" },
};
