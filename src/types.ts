export type Quote = {
  _id: string;
  content: string;
  author: string;
  gender: string;
  tags: string[];
};

export type Gender = "male" | "female";
