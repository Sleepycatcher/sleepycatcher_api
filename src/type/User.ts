export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  watch: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  status: "PREMIUM" | "FREE";
};
