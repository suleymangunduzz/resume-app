'use server';

export async function addComment(formData: FormData) {
  const data = {
    name: formData.get('name'),
    title: formData.get('title'),
    companyName: formData.get('companyName'),
    description: formData.get('description'),
    show: false,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/comments/add`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) throw new Error('Failed to submit comment');
  } catch (error) {
    console.error(error);
    throw error;
  }
}
