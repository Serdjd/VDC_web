import { NextResponse } from 'next/server';

const SPRING_API_BASE_URL = "https://vdc.sergi.tech";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');

    const response = await fetch(`${SPRING_API_BASE_URL}/pre/users?status=${status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Spring API Error (GET /pre/users): ${response.status} - ${errorText}`);

      return NextResponse.json(
        { message: `Error from external API: ${errorText}` || `Spring API returned status ${response.status}` },
        { status: response.status }
      );
    }

    if (response.status === 204) {
      console.log("Spring API returned 204 No Content for pending users. Returning empty array.");
      return NextResponse.json([]);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in Next.js API Route (GET /api/users/pending):", error);
    return NextResponse.json(
      { message: "Internal Server Error during user fetch." },
      { status: 500 }
    );
  }
}