import { NextResponse } from 'next/server';
import { validateEmail } from '../../../lib/emailValidator';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ isValid: false, reason: 'Email is required' }, { status: 400 });
    }

    const result = await validateEmail(email);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in API route:', error);
    return NextResponse.json({ isValid: false, reason: 'An error occurred while validating the email', error: error.message }, { status: 500 });
  }
}