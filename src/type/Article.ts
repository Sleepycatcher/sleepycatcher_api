export type Article = {
  id: string;
  title: string;
  content: string;
  tags: [string];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
