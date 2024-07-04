export const URLS = {
  // auth
  signup: "/sign-up",
  signin: "/sign-in",

  // events
  createEvent: "/events/create",
  updateEvent: "/events/update",

  // profile
  profile: "/profile",
};

// (home)
export const navLinks = [
  {
    name: "Home",
    tag: "home",
    href: "/",
  },
  {
    name: "Create Event",
    tag: "create",
    href: "/events/create",
  },
  {
    name: "My Profile",
    tag: "profile",
    href: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
};
