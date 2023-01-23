export type Stat = {
  id: string;
  idUser: string;
  date: Date;
  data: {
    start: Date;
    end: Date;
    // a voir jeudi
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
