type CreatedBy = {
  id: string;
  name: string;
  createdAt: string;
}

export type Project = {
  id: number;
  name: string;
  description: string;
  createdById: string;
  createdAt: string;
  createdBy?: CreatedBy;
}
