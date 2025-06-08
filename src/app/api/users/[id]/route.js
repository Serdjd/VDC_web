import { NextResponse } from 'next/server';

const SPRING_API_BASE_URL = "https://vdc.sergi.tech";

export async function PUT(request, { params }) {

  const resolvedParams = await params;
  const { id } = resolvedParams; 
  
  try {
    const body = await request.json();

    const response = await fetch(`${SPRING_API_BASE_URL}/pre/users/validate/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log(response.status)

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Spring API Error (PUT /pre/users/validate/${id}): ${response.status} - ${errorText}`);
      return NextResponse.json(
        { message: `Error from external API: ${errorText}` || `Spring API returned status ${response.status}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Validation successful." }, { status: response.status });
  } catch (error) {
    console.error(`Error in Next.js API Route (PUT /api/users/validate/${id}):`, error);
    return NextResponse.json(
      { message: "Internal Server Error during user validation." },
      { status: 500 }
    );
  }
}