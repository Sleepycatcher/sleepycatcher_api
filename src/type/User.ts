export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  watch: [
    {
      id: string;
      ip: string;
      port: number;
      status: "ONLINE" | "OFFLINE";
    }
  ];
  status: "PREMIUM" | "FREE";
};
