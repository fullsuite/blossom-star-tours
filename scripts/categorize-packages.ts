/**
 * Script to auto-categorize tour packages based on content analysis
 *
 * This script fetches all tour packages from Sanity, analyzes their content,
 * and updates them with appropriate durationCategory and categories.
 *
 * Usage: npx tsx scripts/categorize-packages.ts
 */

import { createClient } from '@sanity/client';

const SANITY_PROJECT_ID = 'pfv74ihr';
const SANITY_DATASET = 'production';
const SANITY_API_KEY = process.env.SANITY_API_KEY;

if (!SANITY_API_KEY) {
  console.error('Error: SANITY_API_KEY is not set');
  console.error('Run with: SANITY_API_KEY=your_key npx tsx scripts/categorize-packages.ts');
  process.exit(1);
}

// Initialize Sanity client with write access
const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: SANITY_API_KEY,
  useCdn: false,
});

// Types
interface TourPackage {
  _id: string;
  name: string;
  description: string;
  duration: string;
  durationCategory?: string;
  categories?: string[];
  groups?: {
    name: string;
    standardInclusions?: string[];
    premiumInclusions?: string[];
  }[];
  itinerary?: {
    time: string;
    description: string;
  }[];
}

type DurationCategory = 'half-day' | 'full-day' | 'multi-day';
type TourCategory = 'spiritual' | 'historical' | 'adventure' | 'relaxing' | 'cultural' | 'nature' | 'family';

// Keywords for category detection
const CATEGORY_KEYWORDS: Record<TourCategory, string[]> = {
  spiritual: [
    'mosque', 'masjid', 'prayer', 'salah', 'umrah', 'hajj', 'holy', 'sacred',
    'prophet', 'islamic', 'quran', 'makkah', 'madinah', 'medina', 'kaaba',
    'haram', 'rawdah', 'ziyarat', 'blessed', 'worship', 'dua', 'spiritual',
    'religious', 'pilgrimage', 'quba', 'uhud', 'baqi', 'jannat'
  ],
  historical: [
    'history', 'historical', 'ancient', 'old', 'heritage', 'museum', 'fort',
    'palace', 'battle', 'war', 'empire', 'century', 'traditional', 'legacy',
    'artifact', 'archaeological', 'ruins', 'monument', 'landmark', 'historic'
  ],
  adventure: [
    'adventure', 'hiking', 'trekking', 'climbing', 'explore', 'expedition',
    'safari', 'desert', 'dune', 'quad', 'atv', 'camping', 'outdoor', 'extreme',
    'thrill', 'excitement', 'action', 'sport', 'active'
  ],
  relaxing: [
    'relax', 'leisure', 'comfortable', 'luxury', 'spa', 'resort', 'peaceful',
    'serene', 'calm', 'tranquil', 'rest', 'unwind', 'scenic', 'view', 'sunset',
    'beach', 'garden', 'park', 'easy', 'gentle'
  ],
  cultural: [
    'culture', 'cultural', 'tradition', 'local', 'market', 'souk', 'bazaar',
    'food', 'cuisine', 'art', 'craft', 'handmade', 'authentic', 'experience',
    'community', 'people', 'lifestyle', 'customs'
  ],
  nature: [
    'nature', 'natural', 'mountain', 'valley', 'river', 'lake', 'waterfall',
    'forest', 'wildlife', 'bird', 'animal', 'plant', 'flower', 'garden',
    'landscape', 'scenic', 'green', 'eco', 'environment', 'taif'
  ],
  family: [
    'family', 'kid', 'child', 'children', 'friendly', 'suitable for all',
    'all ages', 'fun', 'entertainment', 'theme park', 'zoo', 'aquarium',
    'educational', 'interactive', 'safe'
  ]
};

// Fetch all tour packages
async function fetchPackages(): Promise<TourPackage[]> {
  const query = `*[_type == "tourPackage"] {
    _id,
    name,
    description,
    duration,
    durationCategory,
    categories,
    groups[] {
      name,
      standardInclusions,
      premiumInclusions
    },
    itinerary[] {
      time,
      description
    }
  }`;

  return sanityClient.fetch(query);
}

// Analyze duration to determine category
function analyzeDuration(duration: string): DurationCategory {
  const lowerDuration = duration.toLowerCase();

  // Check for multi-day indicators
  if (
    lowerDuration.includes('day') && /\d+\s*day/.test(lowerDuration) &&
    !lowerDuration.includes('half') && !lowerDuration.includes('full')
  ) {
    const dayMatch = lowerDuration.match(/(\d+)\s*day/);
    if (dayMatch && parseInt(dayMatch[1]) > 1) {
      return 'multi-day';
    }
  }

  if (
    lowerDuration.includes('night') ||
    lowerDuration.includes('overnight') ||
    lowerDuration.includes('multi') ||
    lowerDuration.includes('week') ||
    lowerDuration.includes('2 day') ||
    lowerDuration.includes('3 day') ||
    lowerDuration.includes('4 day') ||
    lowerDuration.includes('5 day')
  ) {
    return 'multi-day';
  }

  // Check for half-day indicators
  if (
    lowerDuration.includes('half') ||
    lowerDuration.includes('2 hour') ||
    lowerDuration.includes('3 hour') ||
    lowerDuration.includes('4 hour') ||
    lowerDuration.includes('2-3 hour') ||
    lowerDuration.includes('3-4 hour') ||
    lowerDuration.includes('morning') ||
    lowerDuration.includes('afternoon') ||
    lowerDuration.includes('evening')
  ) {
    return 'half-day';
  }

  // Check hours - less than 5 is half day
  const hourMatch = lowerDuration.match(/(\d+)\s*hour/);
  if (hourMatch) {
    const hours = parseInt(hourMatch[1]);
    if (hours <= 4) return 'half-day';
    if (hours <= 8) return 'full-day';
    return 'multi-day';
  }

  // Default to full-day
  if (lowerDuration.includes('full') || lowerDuration.includes('day')) {
    return 'full-day';
  }

  return 'full-day';
}

// Analyze content to determine categories
function analyzeCategories(pkg: TourPackage): TourCategory[] {
  const categories: Set<TourCategory> = new Set();

  // Combine all text content for analysis
  const textContent: string[] = [
    pkg.name,
    pkg.description,
  ];

  // Add group names and inclusions
  pkg.groups?.forEach(group => {
    textContent.push(group.name);
    group.standardInclusions?.forEach(inc => textContent.push(inc));
    group.premiumInclusions?.forEach(inc => textContent.push(inc));
  });

  // Add itinerary descriptions
  pkg.itinerary?.forEach(item => {
    textContent.push(item.description);
  });

  // Join and lowercase for analysis
  const fullText = textContent.join(' ').toLowerCase();

  // Check each category
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (fullText.includes(keyword.toLowerCase())) {
        categories.add(category as TourCategory);
        break; // One keyword match is enough for this category
      }
    }
  }

  // If no categories found, add spiritual as default (since these are Islamic tours)
  if (categories.size === 0) {
    categories.add('spiritual');
  }

  return Array.from(categories);
}

// Update package in Sanity
async function updatePackage(
  packageId: string,
  durationCategory: DurationCategory,
  categories: TourCategory[]
): Promise<void> {
  await sanityClient
    .patch(packageId)
    .set({
      durationCategory,
      categories,
    })
    .commit();
}

// Main execution
async function main() {
  console.log('🔍 Fetching tour packages from Sanity...\n');

  const packages = await fetchPackages();
  console.log(`Found ${packages.length} packages\n`);

  for (const pkg of packages) {
    console.log(`\n📦 Processing: ${pkg.name}`);
    console.log(`   Duration text: "${pkg.duration}"`);

    // Analyze duration
    const durationCategory = analyzeDuration(pkg.duration);
    console.log(`   Duration category: ${durationCategory}`);

    // Analyze categories
    const categories = analyzeCategories(pkg);
    console.log(`   Categories: [${categories.join(', ')}]`);

    // Check if update is needed
    const currentCategories = pkg.categories || [];
    const needsUpdate =
      pkg.durationCategory !== durationCategory ||
      JSON.stringify(currentCategories.sort()) !== JSON.stringify(categories.sort());

    if (!needsUpdate) {
      console.log('   ✅ Already up to date');
      continue;
    }

    try {
      console.log('   💾 Updating Sanity...');
      await updatePackage(pkg._id, durationCategory, categories);
      console.log('   ✅ Done!');
    } catch (error) {
      console.error(`   ❌ Error updating ${pkg.name}:`, error);
    }
  }

  console.log('\n✨ All packages processed!');
}

main().catch(console.error);
