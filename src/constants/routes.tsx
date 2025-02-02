export enum routersNames {
  HOME = "home",
  LOGIN = "login",
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
  // [routersNames.DASHBOARD]: { route: routersNames.DASHBOARD, name: "Inicio" },
  // [routersNames.DASHBOARD]: { route: routersNames.DASHBOARD, name: "Inicio" },
  // [routersNames.DASHBOARD]: { route: routersNames.DASHBOARD, name: "Inicio" },
  // [routersNames.DASHBOARD]: { route: routersNames.DASHBOARD, name: "Inicio" },
  [routersNames.INVITATION]: {
    route: routersNames.INVITATION,
    name: "Invitactión",
  },
  [routersNames.LOGIN]: { route: routersNames.LOGIN, name: "Perfil" },
};
