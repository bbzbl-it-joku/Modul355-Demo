import { Category } from "./category";

export interface Food {
  id: number;
  createdAt: Date;
  name: string | null;
  score: number | null;
  category: Category | null;
}
