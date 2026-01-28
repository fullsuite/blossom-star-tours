/**
 * Migration script: Unpublish old tour packages and create new ones.
 *
 * Old packages become drafts (unpublished).
 * New packages are created as published documents with data strictly from the client.
 *
 * Where the client didn't provide a field (duration, inclusions, images),
 * it's left empty or reuses images from the closest matching old package.
 *
 * Run: SANITY_API_KEY=your_key npx tsx scripts/migrate-packages.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'pfv74ihr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_KEY,
  useCdn: false,
});

// ── Old package IDs to unpublish ──────────────────────────────────────
const OLD_PACKAGE_IDS = [
  '3d0d7bf1-8f8f-4f54-9adb-f5856678ba24', // Historical Madinah Tour → replaced by Ziyarat Tour
  '5fdf326e-74ac-4f00-bcc4-1d44bcc1a271', // Night in the Desert → replaced by Madinah Desert Outing
  '6aa23975-23de-4f2f-adf0-334e72632434', // Hike Mount Uhud → replaced by Mt. Uhud Tour
  '6eb1d907-1b2c-45e0-aed9-8060f8c2da2a', // Saudi Cultural Food Experience → no replacement, removing
  '9fa4ce5c-97f4-4a39-a374-428dac3ea3b5', // Spiritual Desert → replaced by Madinah Desert Outing
  'ab442a94-da83-428f-878a-bd095fe18212', // Date Farm Visit → replaced by Camel Day Tour
  'bf3766ac-8764-4fe8-ad9a-86a456196350', // Istiraha (Relaxation) → replaced by updated Istirahah
];

// ── Image refs from old packages to reuse ─────────────────────────────
const IMAGES = {
  historicalMadinah: [
    { _type: 'image', _key: 'img1a', asset: { _type: 'reference', _ref: 'image-eb370ee977bd6389c71dac1decd45787af1965fc-1920x1280-jpg' } },
    { _type: 'image', _key: 'img1b', asset: { _type: 'reference', _ref: 'image-6ecbcaffab1404cccc5d3d207a94417273ccddf7-1200x1200-jpg' } },
    { _type: 'image', _key: 'img1c', asset: { _type: 'reference', _ref: 'image-6608c03daf209103c8ec1e57b3ca42aaba398bef-670x446-jpg' } },
    { _type: 'image', _key: 'img1d', asset: { _type: 'reference', _ref: 'image-933aa2ab27f80a8c28204f3081b7446c7f981e3e-900x599-jpg' } },
    { _type: 'image', _key: 'img1e', asset: { _type: 'reference', _ref: 'image-c903da64eb863587c2436ac006620076867caf6c-1179x779-jpg' } },
    { _type: 'image', _key: 'img1f', asset: { _type: 'reference', _ref: 'image-15469158583455a402351822b97c9c1d9dd59297-800x600-jpg' } },
    { _type: 'image', _key: 'img1g', asset: { _type: 'reference', _ref: 'image-3d26c11e6e4886c96ebe6a97952ac7733dc82399-2000x1333-jpg' } },
    { _type: 'image', _key: 'img1h', asset: { _type: 'reference', _ref: 'image-574ae9ffebf186d1f6c786f7c072235eeaea6539-1500x1500-jpg' } },
  ],
  nightDesert: [
    { _type: 'image', _key: 'img2a', asset: { _type: 'reference', _ref: 'image-20fe4fd29dd0f916d6f4b9fb61641ffe0c5b5b58-630x360-jpg' } },
    { _type: 'image', _key: 'img2b', asset: { _type: 'reference', _ref: 'image-ccf02aef9b636220a9ac8f16a5603c43af3462da-1200x800-jpg' } },
    { _type: 'image', _key: 'img2c', asset: { _type: 'reference', _ref: 'image-72c61e85f5dfcb76c1242e61b81ff29245e0e586-540x360-jpg' } },
    { _type: 'image', _key: 'img2d', asset: { _type: 'reference', _ref: 'image-a191f36164caf220518ac83f7731466499d841ee-1920x1080-jpg' } },
  ],
  spiritualDesert: [
    { _type: 'image', _key: 'img3a', asset: { _type: 'reference', _ref: 'image-8093142522a9cb064153f34f599c50c50c737a69-1024x683-jpg' } },
    { _type: 'image', _key: 'img3b', asset: { _type: 'reference', _ref: 'image-3e2c4cad45ca21544156ef340e03901e39e41884-900x600-jpg' } },
    { _type: 'image', _key: 'img3c', asset: { _type: 'reference', _ref: 'image-00344c35648f8eb7dd66e65c941a12483b7c7a1f-736x981-jpg' } },
    { _type: 'image', _key: 'img3d', asset: { _type: 'reference', _ref: 'image-95ab495a5672203db04c5e5364db6ce8e455181d-374x250-jpg' } },
  ],
  hikeUhud: [
    { _type: 'image', _key: 'img4a', asset: { _type: 'reference', _ref: 'image-f9b083ce7e61c8bd90732a136231531ac1f78f19-1200x693-jpg' } },
    { _type: 'image', _key: 'img4b', asset: { _type: 'reference', _ref: 'image-856674a5f357e48366bb264195dd068fd54cfc80-1600x1200-jpg' } },
    { _type: 'image', _key: 'img4c', asset: { _type: 'reference', _ref: 'image-ccd7d1408891d467619638324687c35cb91e8e8b-899x529-jpg' } },
    { _type: 'image', _key: 'img4d', asset: { _type: 'reference', _ref: 'image-8093142522a9cb064153f34f599c50c50c737a69-1024x683-jpg' } },
  ],
  istiraha: [
    { _type: 'image', _key: 'img5a', asset: { _type: 'reference', _ref: 'image-ff801208618bd6aaf6d254152351a7f588662ce5-700x466-jpg' } },
    { _type: 'image', _key: 'img5b', asset: { _type: 'reference', _ref: 'image-36ff3eae2a8ef4864d73a7b483431e6c94727077-1058x520-png' } },
    { _type: 'image', _key: 'img5c', asset: { _type: 'reference', _ref: 'image-2ea74d071591c6f686430aa3b030a958b868e068-1600x1067-jpg' } },
    { _type: 'image', _key: 'img5d', asset: { _type: 'reference', _ref: 'image-f9b083ce7e61c8bd90732a136231531ac1f78f19-1200x693-jpg' } },
  ],
  dateFarm: [
    { _type: 'image', _key: 'img6a', asset: { _type: 'reference', _ref: 'image-136c54ce19e6cfb262d62ea3a20c2e416c048679-1778x1000-jpg' } },
    { _type: 'image', _key: 'img6b', asset: { _type: 'reference', _ref: 'image-0edd1c988e25815db97e9027578397a340d501af-1384x927-jpg' } },
    { _type: 'image', _key: 'img6c', asset: { _type: 'reference', _ref: 'image-970badb0f52d282763a2d7ca491684aa6197c9ee-2161x1215-jpg' } },
    { _type: 'image', _key: 'img6d', asset: { _type: 'reference', _ref: 'image-c749219fd8b763c710d0c898ca6c54d553a58e8f-1200x800-jpg' } },
  ],
};

// ── New packages ──────────────────────────────────────────────────────

const NEW_PACKAGES = [
  // 1. Ziyarat Tour (replaces Historical Madinah Tour)
  {
    _type: 'tourPackage',
    name: 'Ziyarat Tour',
    slug: { _type: 'slug', current: 'ziyarat-tour' },
    // Client didn't provide a description — leaving the old one as a placeholder
    // since this replaces Historical Madinah Tour and the stops are likely similar
    description: 'Stops: Quba, Qiblatian, Uhud and Khandaq.\nTour guided by experienced Mashayakh.\nCovering important aspects of Seerah.\nSpiritual and imaan experience.',
    duration: '3-4 hours', // kept from old package
    durationCategory: 'half-day',
    categories: ['spiritual', 'historical', 'cultural'],
    images: IMAGES.historicalMadinah,
    groups: [
      {
        _type: 'object',
        _key: 'g1',
        name: '1-3 People',
        minGroupSize: 1,
        maxGroupSize: 3,
        pricingType: 'perGroup',
        standardPricing: 250,
        standardInclusions: ['Guided ziyarat tour'],
      },
      {
        _type: 'object',
        _key: 'g2',
        name: '4-7 People',
        minGroupSize: 4,
        maxGroupSize: 7,
        pricingType: 'perGroup',
        standardPricing: 350,
        standardInclusions: ['Guided ziyarat tour'],
      },
      {
        _type: 'object',
        _key: 'g3',
        name: '8-20 People',
        minGroupSize: 8,
        maxGroupSize: 20,
        pricingType: 'perGroup',
        standardPricing: 600,
        standardInclusions: ['Guided ziyarat tour'],
      },
      {
        _type: 'object',
        _key: 'g4',
        name: '21-50 People',
        minGroupSize: 21,
        maxGroupSize: 50,
        pricingType: 'perGroup',
        standardPricing: 1000,
        standardInclusions: ['Guided ziyarat tour'],
      },
    ],
  },

  // 2. Walking Tour around Masjid Nabawi (NEW)
  {
    _type: 'tourPackage',
    name: 'Walking Tour around Masjid Nabawi',
    slug: { _type: 'slug', current: 'walking-tour-masjid-nabawi' },
    description:
      "Learn about the houses of the wives of the Prophet \uFDFA and the sahaba's houses around the Masjid and their ordinary locations, about Baqee, details about the Rawda.",
    duration: '', // client didn't specify — to be filled in Sanity Studio
    durationCategory: 'half-day',
    categories: ['spiritual', 'historical', 'cultural'],
    // No images available — reusing Madinah historical images as closest match
    images: [IMAGES.historicalMadinah[0], IMAGES.historicalMadinah[1], IMAGES.historicalMadinah[6], IMAGES.historicalMadinah[7]],
    groups: [
      {
        _type: 'object',
        _key: 'g1',
        name: '4-10 People',
        minGroupSize: 4,
        maxGroupSize: 10,
        pricingType: 'perGroup',
        standardPricing: 200,
        standardInclusions: ['Guided walking tour around Masjid Nabawi'],
      },
      {
        _type: 'object',
        _key: 'g2',
        name: '11-25 People',
        minGroupSize: 11,
        maxGroupSize: 25,
        pricingType: 'perGroup',
        standardPricing: 300,
        standardInclusions: ['Guided walking tour around Masjid Nabawi'],
      },
    ],
  },

  // 3. Istirahah (Relaxation) — updated version
  {
    _type: 'tourPackage',
    name: 'Istirahah (Relaxation)',
    slug: { _type: 'slug', current: 'istirahah-relaxation' },
    description:
      'Private villa includes pool, large indoor + outdoor seating areas, with food and transportation. Islamic reminders.',
    duration: '3-4 hours', // kept from old package
    durationCategory: 'half-day',
    categories: ['spiritual', 'relaxing', 'cultural'],
    images: IMAGES.istiraha,
    groups: [
      {
        _type: 'object',
        _key: 'g1',
        name: 'Standard',
        minGroupSize: 1,
        maxGroupSize: 50,
        pricingType: 'perPerson',
        standardPricing: 100,
        standardInclusions: [
          'Private villa with pool',
          'Large indoor + outdoor seating areas',
          'Food',
          'Transportation',
          'Islamic reminders',
        ],
      },
    ],
  },

  // 4. Madinah Desert Outing (replaces Night in Desert + Spiritual Desert)
  {
    _type: 'tourPackage',
    name: 'Madinah Desert Outing',
    slug: { _type: 'slug', current: 'madinah-desert-outing' },
    description:
      "Bayda + ATV's. Spend a night under the stars in the desert of Madinah, comfortable sitting area, food provided, Islamic reminders.",
    duration: '4 hours', // kept from old desert packages
    durationCategory: 'half-day',
    categories: ['spiritual', 'adventure', 'nature'],
    // Combine images from both old desert packages
    images: [...IMAGES.nightDesert, ...IMAGES.spiritualDesert],
    groups: [
      {
        _type: 'object',
        _key: 'g1',
        name: 'With ATV',
        minGroupSize: 1,
        maxGroupSize: 50,
        pricingType: 'perPerson',
        standardPricing: 100,
        standardInclusions: [
          'ATV ride',
          'Night under the stars',
          'Comfortable sitting area',
          'Food',
          'Islamic reminders',
        ],
      },
      {
        _type: 'object',
        _key: 'g2',
        name: 'Without ATV',
        minGroupSize: 1,
        maxGroupSize: 50,
        pricingType: 'perPerson',
        standardPricing: 80,
        standardInclusions: [
          'Night under the stars',
          'Comfortable sitting area',
          'Food',
          'Islamic reminders',
        ],
      },
    ],
  },

  // 5. Camel Day Tour (replaces Date Farm Visit)
  {
    _type: 'tourPackage',
    name: 'Camel Day Tour',
    slug: { _type: 'slug', current: 'camel-day-tour' },
    description: 'Drink camel milk, ride a camel, eat camel meat.',
    duration: '', // client didn't specify — to be filled in Sanity Studio
    durationCategory: 'full-day',
    categories: ['adventure', 'cultural', 'nature'],
    // Reuse date farm images as closest nature/farm match
    images: IMAGES.dateFarm,
    groups: [
      {
        _type: 'object',
        _key: 'g1',
        name: 'With Camel Ride',
        minGroupSize: 1,
        maxGroupSize: 50,
        pricingType: 'perPerson',
        standardPricing: 100,
        standardInclusions: [
          'Camel ride',
          'Camel milk',
          'Camel meat meal',
        ],
      },
      {
        _type: 'object',
        _key: 'g2',
        name: 'Without Camel Ride',
        minGroupSize: 1,
        maxGroupSize: 50,
        pricingType: 'perPerson',
        standardPricing: 80,
        standardInclusions: [
          'Camel milk',
          'Camel meat meal',
        ],
      },
    ],
  },

  // 6. Mt. Uhud Tour (replaces Hike Mount Uhud)
  {
    _type: 'tourPackage',
    name: 'Mt. Uhud Tour',
    slug: { _type: 'slug', current: 'mt-uhud-tour' },
    description:
      'See the beautiful view of Madinah from the top of Mt Uhud. Catch the sunrise or sunset over Madinah, or Madinah night view. Snacks, tea, coffee provided. Plus reminder.',
    duration: '2-3 hours', // kept from old package
    durationCategory: 'half-day',
    categories: ['spiritual', 'adventure', 'nature'],
    images: IMAGES.hikeUhud,
    groups: [
      {
        _type: 'object',
        _key: 'g1',
        name: 'Hike',
        minGroupSize: 1,
        maxGroupSize: 50,
        pricingType: 'perPerson',
        standardPricing: 50,
        standardInclusions: [
          'Guided hike up Mt. Uhud',
          'Snacks',
          'Tea & coffee',
          'Spiritual reminder',
        ],
      },
      {
        _type: 'object',
        _key: 'g2',
        name: 'SUV Up',
        minGroupSize: 1,
        maxGroupSize: 50,
        pricingType: 'perPerson',
        standardPricing: 70,
        standardInclusions: [
          'SUV ride to the top of Mt. Uhud',
          'Snacks',
          'Tea & coffee',
          'Spiritual reminder',
        ],
      },
    ],
  },
];

// ── Old → New mapping for homepage featured packages ──────────────────
// The homepage references 3 featured packages. We'll replace them:
//   Historical Madinah Tour → Ziyarat Tour (index 0)
//   Night in the Desert → Madinah Desert Outing (index 3)
//   Hike Mount Uhud → Mt. Uhud Tour (index 5)
const HOMEPAGE_ID = 'ec47fb98-385c-4b6d-bbac-21619ae01a5b';
const FEATURED_REPLACEMENT_INDICES = [0, 3, 5]; // indices into NEW_PACKAGES

// ── Main ──────────────────────────────────────────────────────────────

async function main() {
  console.log('🔄 Starting package migration...\n');

  // Step 1: Create new packages first
  console.log('📝 Creating new packages...');
  const createdIds: string[] = [];
  for (const pkg of NEW_PACKAGES) {
    const created = await client.create(pkg);
    createdIds.push(created._id);
    console.log(`   ✅ Created: ${pkg.name} (${created._id})`);
  }

  // Step 2: Update homepage featured packages references
  console.log('\n🏠 Updating homepage featured packages...');
  const newFeaturedRefs = FEATURED_REPLACEMENT_INDICES.map((idx, i) => ({
    _key: `featured${i}`,
    _ref: createdIds[idx],
    _type: 'reference',
  }));
  await client
    .patch(HOMEPAGE_ID)
    .set({ 'featuredPackages.packages': newFeaturedRefs })
    .commit();
  console.log('   ✅ Homepage updated with new featured packages');

  // Step 3: Check for any other references to old packages
  console.log('\n🔍 Checking for remaining references...');
  for (const id of OLD_PACKAGE_IDS) {
    const refs = await client.fetch(
      `*[references($id)] { _id, _type }`,
      { id }
    );
    if (refs.length > 0) {
      console.log(`   ⚠️  ${id} still referenced by: ${refs.map((r: any) => `${r._type}(${r._id})`).join(', ')}`);
      console.log(`       Removing references...`);
      for (const ref of refs) {
        // Remove the reference from the referencing document
        await client
          .patch(ref._id)
          .unset([`*[_ref == "${id}"]`])
          .commit();
      }
    }
  }

  // Step 4: Unpublish old packages (move to draft state)
  console.log('\n📦 Unpublishing old packages...');
  for (const id of OLD_PACKAGE_IDS) {
    const doc = await client.getDocument(id);
    if (!doc) {
      console.log(`   ⚠️  Document ${id} not found, skipping.`);
      continue;
    }
    const draftId = `drafts.${id}`;
    // Check if draft already exists
    const existingDraft = await client.getDocument(draftId);
    if (!existingDraft) {
      // Create a draft copy
      await client.createOrReplace({
        ...doc,
        _id: draftId,
      });
    }
    // Delete the published version
    await client.delete(id);
    console.log(`   ✅ Unpublished: ${doc.name}`);
  }

  console.log('\n✨ Migration complete!');
  console.log('\n⚠️  Reminder — fill in manually via Sanity Studio:');
  console.log('   • Ziyarat Tour: confirm name with client, update description/inclusions if needed');
  console.log('   • Walking Tour around Masjid Nabawi: add duration, upload proper images');
  console.log('   • Camel Day Tour: add duration, upload proper images');
}

main().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
