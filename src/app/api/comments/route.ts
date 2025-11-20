export async function POST(request: Request) {
  try {
    const requestData = await request.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/comments/add`,
      {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      },
    );

    if (res.ok) {
      return new Response(JSON.stringify({ message: 'Comment received' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error('Failed to submit comment');
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Error processing comment',
        error: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
