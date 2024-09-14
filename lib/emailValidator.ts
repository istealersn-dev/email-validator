import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);
const resolve4 = promisify(dns.resolve4);

export async function validateEmail(email: string): Promise<any> {
  console.log(`Validating email: ${email}`);

  // Step 1: Syntax validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('Email failed syntax validation');
    return { isValid: false, reason: 'Invalid email format' };
  }

  // Step 2: Look for special characters (excluding allowed ones)
  const specialCharRegex = /[<>()[\]\\,;:"\s]/;
  if (specialCharRegex.test(email)) {
    console.log('Email contains invalid special characters');
    return { isValid: false, reason: 'Invalid special characters in email' };
  }

  // Extract domain from email
  const domain = email.split('@')[1];
  console.log(`Extracted domain: ${domain}`);

  try {
    // Step 3: Look up domain
    console.log('Looking up domain...');
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulating a domain lookup

    // Step 4: NS lookup for domain MX records or A records
    console.log('Performing MX record lookup...');
    let mxRecords;
    try {
      mxRecords = await resolveMx(domain);
      console.log('MX records found:', mxRecords);
    } catch (error) {
      console.log('MX lookup failed, attempting A record lookup...');
      // If MX lookup fails, try A record
      await resolve4(domain);
      console.log('A record found');
    }

    // Step 5: Resolve MX records or A records to IP address
    let ipAddress;
    if (mxRecords && mxRecords.length > 0) {
      console.log(`Resolving MX record: ${mxRecords[0].exchange}`);
      ipAddress = await resolve4(mxRecords[0].exchange);
    } else {
      console.log(`Resolving domain: ${domain}`);
      ipAddress = await resolve4(domain);
    }
    console.log('IP address resolved:', ipAddress);

    // If we've made it this far, the email is considered valid
    return {
      isValid: true,
      email,
      domain,
      mxRecords: mxRecords ? mxRecords.map((record) => record.exchange) : 'N/A',
      ipAddress: ipAddress[0],
    };
  } catch (error: any) {
    console.error('Error during email validation:', error);
    return { isValid: false, reason: 'Unable to verify domain or MX records', error: error.message };
  }
}