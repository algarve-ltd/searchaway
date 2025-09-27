import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Forward all search parameters to the Quote Away API
    const quoteAwayBaseUrl = process.env.QUOTE_AWAY_API_URL || 'http://localhost:3002';
    const quoteAwayUrl = new URL(`${quoteAwayBaseUrl}/api/public/quotes`);

    // Copy all search parameters from the request
    searchParams.forEach((value, key) => {
      quoteAwayUrl.searchParams.append(key, value);
    });

    console.log('Proxying request to Quote Away:', quoteAwayUrl.toString());

    // Make the request to Quote Away API from the backend
    const response = await fetch(quoteAwayUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Quote Away API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch quotes from Quote Away API' },
        { status: response.status }
      );
    }

    const data = await response.json();

    console.log('Successfully fetched quotes:', data.meta);

    // Return the data as-is since it's already in the expected format
    return NextResponse.json(data);

  } catch (error) {
    console.error('Proxy API error:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching quotes' },
      { status: 500 }
    );
  }
}