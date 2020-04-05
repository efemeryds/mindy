export interface Inspiration {
  id: string;
  title: string;
  description: string;
  moreLink: string;
}

export interface InspirationCategory {
  id: string;
  categoryName: string;
  categoryImage: string;
  items: Inspiration[];
}
