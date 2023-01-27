export type Article = {
  id: string;
  title: string;
  content: string;
  source: string;
  tags: Array<Tags>;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type Tags = keyof typeof Tag;

enum Tag {
  sport = "sport",
  bienEtre = "bien-être",
  respiration = "respiration",
  sommeil = "sommeil",
  alimentation = "alimentation",
}
