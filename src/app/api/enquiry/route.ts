import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3';

// Contact list ID for marketing (you may need to create this in Brevo)
const MARKETING_LIST_ID = 2; // Default list ID, update as needed

interface EnquiryData {
  name: string;
  dateOfBirth: string;
  country: string;
  whatsappNumber: string;
  saudiNumber?: string;
  email: string;
  hotel: string;
  customHotel?: string;
  numberOfMen: string;
  numberOfWomen: string;
  numberOfKids: string;
  serviceType: string;
  packageId: string;
  packageName: string;
  packageSlug: string;
  packageImage?: string;
  packageDuration?: string;
}

// Helper function to get hotel display name
function getHotelDisplayName(hotel: string, customHotel?: string): string {
  if (hotel === 'custom' && customHotel) {
    return customHotel;
  }

  const hotelNames: Record<string, string> = {
    'swissotel-makkah': 'Swissotel Al Maqam Makkah',
    'fairmont-makkah': 'Fairmont Makkah Clock Tower',
    'hilton-makkah': 'Hilton Makkah Convention Hotel',
    'movenpick-makkah': 'Movenpick Hotel & Residence Hajar Tower Makkah',
    'pullman-zamzam-makkah': 'Pullman ZamZam Makkah',
    'conrad-makkah': 'Conrad Makkah',
    'raffles-makkah': 'Raffles Makkah Palace',
    'jabal-omar-hyatt': 'Jabal Omar Hyatt Regency Makkah',
    'dar-al-tawhid': 'Dar Al Tawhid Intercontinental',
    'sheraton-makkah': 'Sheraton Makkah Jabal Al Kaaba Hotel',
    'oberoi-madinah': 'The Oberoi Madinah',
    'ritz-carlton-madinah': 'The Ritz-Carlton Madinah',
    'hilton-madinah': 'Hilton Madinah',
    'pullman-zamzam-madinah': 'Pullman Zamzam Madinah',
    'crowne-plaza-madinah': 'Crowne Plaza Madinah',
    'intercontinental-madinah': 'InterContinental Madinah - Dar Al Iman',
    'anwar-al-madinah': 'Anwar Al Madinah Movenpick',
    'shaza-madinah': 'Shaza Al Madinah',
    'dar-al-taqwa': 'Dar Al Taqwa Hotel Madinah',
    'millennium-madinah': 'Millennium Al Madinah Airport',
  };

  return hotelNames[hotel] || hotel || 'Not specified';
}

// Helper function to get service type display name
function getServiceTypeDisplayName(serviceType: string): string {
  const serviceTypes: Record<string, string> = {
    'private': 'Private Tour',
    'group': 'Group Tour',
    'vip': 'VIP Experience',
    'custom': 'Custom Package',
  };
  return serviceTypes[serviceType] || serviceType;
}

// Send email via Brevo
async function sendEmail(
  to: { email: string; name?: string }[],
  subject: string,
  htmlContent: string,
  replyTo?: { email: string; name?: string }
) {
  const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: {
        name: 'Blossom Star Tours',
        email: 'services+blossomtours@fullsuite.agency',
      },
      to,
      replyTo,
      subject,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Brevo email error:', error);
    throw new Error('Failed to send email');
  }

  return response.json();
}

// Add contact to Brevo list
async function addContactToList(email: string, name: string, attributes: Record<string, unknown>) {
  // First, create or update the contact
  const contactResponse = await fetch(`${BREVO_API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY!,
    },
    body: JSON.stringify({
      email,
      attributes: {
        FIRSTNAME: name.split(' ')[0],
        LASTNAME: name.split(' ').slice(1).join(' ') || '',
        ...attributes,
      },
      listIds: [MARKETING_LIST_ID],
      updateEnabled: true,
    }),
  });

  if (!contactResponse.ok) {
    const error = await contactResponse.json();
    // Ignore duplicate contact error
    if (error.code !== 'duplicate_parameter') {
      console.error('Brevo contact error:', error);
    }
  }
}

// Load and process email template
async function loadEmailTemplate(templateName: string, variables: Record<string, string>): Promise<string> {
  const templatePath = path.join(process.cwd(), 'src', 'app', 'emails', `${templateName}.html`);
  let template = await fs.readFile(templatePath, 'utf-8');

  // Replace simple variables: {{variableName}}
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    template = template.replace(regex, value);
  }

  // Handle conditional blocks: {{#variableName}}...{{/variableName}}
  // If the variable is truthy, keep the content; otherwise, remove the block
  for (const [key, value] of Object.entries(variables)) {
    const conditionalRegex = new RegExp(`\\{\\{#${key}\\}\\}([\\s\\S]*?)\\{\\{/${key}\\}\\}`, 'g');
    if (value && value.trim() !== '') {
      // Keep the content but remove the tags
      template = template.replace(conditionalRegex, '$1');
    } else {
      // Remove the entire block
      template = template.replace(conditionalRegex, '');
    }
  }

  return template;
}

// Prepare template variables from enquiry data
function prepareTemplateVariables(data: EnquiryData): Record<string, string> {
  const totalPeople = (parseInt(data.numberOfMen) || 0) +
                      (parseInt(data.numberOfWomen) || 0) +
                      (parseInt(data.numberOfKids) || 0);

  return {
    name: data.name,
    firstName: data.name.split(' ')[0],
    email: data.email,
    dateOfBirth: data.dateOfBirth,
    country: data.country,
    whatsappNumber: data.whatsappNumber,
    whatsappNumberClean: data.whatsappNumber.replace(/[^0-9]/g, ''),
    saudiNumber: data.saudiNumber || '',
    hotel: getHotelDisplayName(data.hotel, data.customHotel),
    numberOfMen: data.numberOfMen || '0',
    numberOfWomen: data.numberOfWomen || '0',
    numberOfKids: data.numberOfKids || '0',
    totalPeople: totalPeople.toString(),
    serviceType: getServiceTypeDisplayName(data.serviceType),
    packageId: data.packageId,
    packageName: data.packageName,
    packageSlug: data.packageSlug,
    packageImage: data.packageImage || '',
    packageDuration: data.packageDuration || '',
  };
}

export async function POST(request: NextRequest) {
  try {
    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY is not configured');
      return NextResponse.json(
        { message: 'Email service not configured' },
        { status: 500 }
      );
    }

    const data: EnquiryData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.whatsappNumber || !data.country || !data.serviceType) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Prepare template variables
    const templateVariables = prepareTemplateVariables(data);

    // Load and send admin email
    const adminEmailHtml = await loadEmailTemplate('admin-enquiry', templateVariables);
    await sendEmail(
      [
        { email: 'info@blossom-star.com', name: 'Blossom Star' },
        { email: 'hady@acacia.design', name: 'Hady' },
        { email: 'mazen@fullsuite.agency', name: 'Mazen Kourouche' },
      ],
      `New Package Enquiry: ${data.packageName} - ${data.name}`,
      adminEmailHtml,
      { email: data.email, name: data.name }
    );

    // Load and send customer confirmation email
    const customerEmailHtml = await loadEmailTemplate('customer-enquiry', templateVariables);
    await sendEmail(
      [{ email: data.email, name: data.name }],
      `Thank You for Your Enquiry - ${data.packageName}`,
      customerEmailHtml
    );

    // Add contact to marketing list
    await addContactToList(data.email, data.name, {
      WHATSAPP: data.whatsappNumber,
      COUNTRY: data.country,
      PACKAGE_INTEREST: data.packageName,
      SERVICE_TYPE: data.serviceType,
    });

    return NextResponse.json(
      { message: 'Enquiry submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { message: 'Failed to process enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
