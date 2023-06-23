export type Comment = {
  readonly _id: string;
  readonly description: string;
  readonly companyName: string;
  readonly name: string;
  readonly title: string;
  readonly show: boolean;
};

export type Tab = {
  readonly _id: string;
  readonly isVisible: string;
  readonly key: string;
  readonly path: string;
  readonly displayText: string;
  readonly order: number;
};

export type Experience = {
  readonly _id: string;
  readonly companyName: string;
  readonly title: string;
  readonly description: string;
  readonly beginDate: string;
  readonly endDate: string;
  readonly stillWorking: boolean;
  readonly website: string;
  readonly techStack: string[];
  readonly location: string;
  readonly order: number;
};
