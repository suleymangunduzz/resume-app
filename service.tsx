import { Comment, Experience, Tab } from '@/types';

export const fetchComments: Promise<Array<Comment>> = fetch(
  `${__BASE_API_URL__}/comments`
).then((res) => res.json());

export const fetchTabs: Promise<Array<Tab>> = fetch(
  `${__BASE_API_URL__}/tabs`
).then((res) => res.json());

export const fetchExperience: Promise<Array<Experience>> = fetch(
  `${__BASE_API_URL__}/experience`
).then((res) => res.json());
