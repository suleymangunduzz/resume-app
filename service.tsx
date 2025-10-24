import { Comment, Experience, Tab } from '@/types';

export const fetchComments: Promise<ReadonlyArray<Comment>> = fetch(
  `${process.env.NEXT_PUBLIC_BASE_API_URL}/comments`,
).then((res) => res.json());

export const fetchTabs: Promise<ReadonlyArray<Tab>> = fetch(
  `${process.env.NEXT_PUBLIC_BASE_API_URL}/tabs`,
).then((res) => res.json());

export const fetchExperience: Promise<ReadonlyArray<Experience>> = fetch(
  `${process.env.NEXT_PUBLIC_BASE_API_URL}/experience`,
).then((res) => res.json());

export const addComment = (comment: Omit<Comment, 'show'>) =>
  fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/comments/add`, {
    body: JSON.stringify({ ...comment, show: false }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
