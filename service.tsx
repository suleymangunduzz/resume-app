import { Comment, Experience, Tab } from '@/types';

export const fetchComments: Promise<ReadonlyArray<Comment>> = fetch(
  `${__BASE_API_URL__}/comments`
).then((res) => res.json());

export const fetchTabs: Promise<ReadonlyArray<Tab>> = fetch(
  `${__BASE_API_URL__}/tabs`
).then((res) => res.json());

export const fetchExperience: Promise<ReadonlyArray<Experience>> = fetch(
  `${__BASE_API_URL__}/experience`
).then((res) => res.json());

export const addComment = (comment: Omit<Comment, 'show'>) =>
  fetch(`${__BASE_API_URL__}/comments/add`, {
    body: JSON.stringify({ ...comment, show: false }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
