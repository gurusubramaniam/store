import { NextRequest, NextResponse } from 'next/server';
import shoppingData from '../../data/shopping.json';

type CartItem = {
  itemNumber: string;
};

// Extend NextRequest to include session (if you're using something like `express-session`)
interface CustomNextRequest extends NextRequest {
  session?: {
    cartItems?: CartItem[];
    itemNumber?: string;
  };
}

/**
 * Handles the GET request for fetching shopping items.
 *
 * @param {CustomNextRequest} req - The request object.
 */
export async function GET(req: CustomNextRequest) {
  try {
    // Parse the 'page' query parameter from req.nextUrl
    const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);

    if (isNaN(page) || page < 1) {
      return NextResponse.json({ message: 'Invalid page number' }, { status: 400 });
    }

    const totalItems = shoppingData.length;
    const itemsPerPage = 12;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const responseData = shoppingData.slice(startIndex, endIndex);

    return NextResponse.json({
      data: responseData,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
  }
}

/**
 * Handles the POST request for adding itemNumber to the session.
 *
 * @param {CustomNextRequest} req - The request object.
 */
export async function POST(req: CustomNextRequest) {
  try {
    const { itemNumber } = await req.json();

    if (!itemNumber) {
      return NextResponse.json({ message: 'itemNumber is required' }, { status: 400 });
    }

    // Assuming session is available (this would depend on how your session is set up)
    req.session = req.session || {};
    req.session.itemNumber = itemNumber;

    return NextResponse.json({ message: 'Item number added to session', itemNumber });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
  }
}
