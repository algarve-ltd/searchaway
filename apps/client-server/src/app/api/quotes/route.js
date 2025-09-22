import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    // Get the quote-away API URL from environment variables
    const quoteAwayApiUrl = process.env.QUOTE_AWAY_API_URL || 'http://localhost:3000';

    // Forward the search parameters from the original request
    const { searchParams } = new URL(req.url);
    const queryString = searchParams.toString();

    // Construct the full URL to the quote-away public API
    const apiUrl = `${quoteAwayApiUrl}/api/public/quotes${queryString ? `?${queryString}` : ''}`;

    // Make the request to quote-away API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Quote-away API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch quotes from quote-away service' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the data from quote-away API
    return NextResponse.json(data);

  } catch (error) {
    console.error('Proxy API error:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching quotes' },
      { status: 500 }
    );
  }
}