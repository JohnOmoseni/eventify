// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== METADATA PARAMS
export type MetaDataParams = {
  eventId: string;
  buyerId: string;
};

// ====== EVENT PARAMS
export type CreateEventParams = {
  userId: string;
  path: string;
  event: {
    title: string;
    description?: string;
    location?: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime?: Date;
    categoryId?: string;
    price?: string;
    isFree: boolean;
    url?: string;
  };
};

export type UpdateEventParams = {
  userId: string;
  event: {
    _id: string;
    title: string;
    imageUrl: string;
    description?: string;
    location?: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type DeleteEventParams = {
  eventId: string;
  path: string;
};

export type GetAllEventsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetEventsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedEventsByCategoryParams = {
  categoryId: string;
  eventId: string;
  limit?: number;
  page: number | string;
};

export type Event = {
  _id: string;
  title: string;
  description: string;
  price: string;
  isFree: boolean;
  imageUrl: string;
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  url: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
};

// ====== ORDER PARAMS
export type CheckOutOrderParamsFlw = {
  tx_reference: string;
  eventTitle: string;
  eventDesc: string;
  price: string;
  isFree: boolean;
  eventLogo: string;
  user: {
    email: string;
    username?: string;
    phoneNumber: string;
  };
};

export type CreateOrderParamsFlw = {
  createdAt: Date;
  txnId: string;
  flwId: string;
  totalAmount: string;
  status: string;
  paymentType?: string;
  event: string;
  buyer: string;
};

export type GetOrdersByEventParams = {
  eventId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
