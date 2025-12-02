'use client';

import { useEffect, useState } from 'react';

import { Comment } from '@/app/[locale]/comments/page';

export default function AdminCommentsDashboard() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);

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

      fetchComments();
    } catch (err: any) {
      alert(err.message || 'Error updating comment');
    }
  }

  async function deleteComment() {
    if (!deleteCommentId) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/comments/${deleteCommentId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );
      if (!res.ok) throw new Error('Failed to delete comment');

      fetchComments();
      setShowDeleteModal(false);
      setDeleteCommentId(null);
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
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
            <form
              method="dialog"
              onSubmit={(event) => {
                event.preventDefault();
                deleteComment();
              }}
            >
              <h3 className="font-bold text-lg mb-4 text-center">
                Are you sure?
              </h3>

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                  Yes, delete
                </button>

                <button
                  type="button"
                  className="w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300 transition"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                onClick={() => {
                  setDeleteCommentId(comment._id);
                  setShowDeleteModal(true);
                }}
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
