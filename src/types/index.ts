// ====== ROOT PARAMS
export type NavLinkProps = {
  name: string;
  tag: string;
  href: string;
  idx?: number;
  menu?: boolean;
  handleClick?: () => void;
};

// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};
