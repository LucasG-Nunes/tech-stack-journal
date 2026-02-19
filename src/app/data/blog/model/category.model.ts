export interface TechItem {
  id:string;
  icon: string;
  name: string;
  description: string;
  articleCount: number;
  slug: string;
}

export interface TechCategory {
  id:string;
  title: string;
  description: string;
  icon: string;
  items: TechItem[];
}