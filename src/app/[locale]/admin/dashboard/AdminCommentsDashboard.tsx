'use client';

import { useEffect, useState } from 'react';

export type Comment = {
  _id: string;
  description: string;
  companyName: string;
  name: string;
  title: string;
  show: boolean;
};

export default function AdminCommentsDashboard() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchComments() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/comments/all`,
        { credentials: 'include' },
      );
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching comments');
    } finally {
      setLoading(false);
    }
  }

  async function toggleShow(commentId: string, current: boolean) {
    return;
    // TOOD: implement this function to toggle comment visibility
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/comments/${commentId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ show: !current }),
        },
      );

      if (!res.ok) throw new Error('Failed to update comment');

      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, show: !current } : c)),
      );
    } catch (err: any) {
      alert(err.message || 'Error updating comment');
    }
  }

  async function deleteComment(commentId: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/comments/${commentId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );
      if (!res.ok) throw new Error('Failed to delete comment');

      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err: any) {
      alert(err.message || 'Error deleting comment');
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <section
      className="p-6"
      style={{ background: 'var(--page-bg)', minHeight: '100vh' }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-center text-[var(--card-text)]">
        Admin Comments Dashboard
      </h2>

      {loading && <p>Loading comments...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="p-4 rounded-xl shadow border hover:shadow-md transition"
            style={{
              background: 'var(--card-bg)',
              color: 'var(--card-text)',
              borderColor: 'var(--card-border)',
            }}
          >
            <h3 className="text-lg font-semibold">{comment.name}</h3>
            <p className="text-sm text-[var(--card-subtext)]">
              {comment.title}
            </p>
            <p className="mt-2">{comment.description}</p>
            <p className="mt-1 text-[var(--card-subtext)]">
              {comment.companyName}
            </p>
            <p className="mt-1 text-sm">
              Visible: {comment.show ? 'Yes' : 'No'}
            </p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => toggleShow(comment._id, comment.show)}
                className={`px-3 py-1 rounded text-white ${
                  comment.show
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {comment.show ? 'Hide' : 'Activate'}
              </button>

              <button
                onClick={() => deleteComment(comment._id)}
                className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {comments.length === 0 && !loading && (
          <p
            className="text-center col-span-full"
            style={{ color: 'var(--card-subtext)' }}
          >
            No comments found.
          </p>
        )}
      </div>
    </section>
  );
}
