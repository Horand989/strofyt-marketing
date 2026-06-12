// The six SEO intent clusters for Strofyt. Each cluster gets a hub page at
// /learn/[slug]/ and every article belongs to exactly one cluster.
// Hub-and-spoke internal linking builds topical authority around
// strength training for masters athletes 50+.

export type Cluster = {
  slug: string;
  name: string;
  title: string; // H1 of the hub page, written for the searcher
  description: string; // meta description, <= 155 chars
  intro: string; // hub intro copy — expand to 800-1200 words later
};

export const CLUSTERS: Cluster[] = [
  {
    slug: 'strength-after-50',
    name: 'Strength After 50',
    title: 'Strength Training After 50',
    description:
      'How to build and keep real strength after 50. Honest, experience-based guides on lifting, programming, and progress for masters athletes.',
    intro:
      'Strength is not a young person\u2019s game. It is a long game, and after 50 you play it with better judgment and worse recovery. These guides cover what actually changes, what does not, and how to keep adding weight to the bar for decades.',
  },
  {
    slug: 'getting-back',
    name: 'Getting Back Into Lifting',
    title: 'Getting Back Into Lifting After a Layoff',
    description:
      'Returning to the gym after years away, an injury, or a long break? How to restart training after 50 without wrecking yourself in week two.',
    intro:
      'The hardest part of coming back is not the first workout. It is week three, when your enthusiasm writes checks your tendons cannot cash. These guides map the comeback: where to start, how fast to ramp, and how to make this return the one that sticks.',
  },
  {
    slug: 'joint-friendly-training',
    name: 'Joint-Friendly Training',
    title: 'Joint-Friendly Strength Training',
    description:
      'Train hard around cranky shoulders, knees, and backs. Exercise swaps, technique adjustments, and loading strategies that respect older joints.',
    intro:
      'Cranky joints are information, not a verdict. Almost every lift has a variation that loads the muscle while sparing the joint. These guides cover the swaps, the technique adjustments, and when soreness means modify versus stop.',
  },
  {
    slug: 'recovery',
    name: 'Recovery',
    title: 'Recovery for Athletes Over 50',
    description:
      'Recovery is where strength is built, and after 50 it is the limiting factor. Sleep, deloads, training frequency, and listening to the right signals.',
    intro:
      'After 50, recovery is the limiting factor — not effort, not willpower. The lifters who keep progressing are the ones who manage recovery as deliberately as they manage their working sets. These guides cover frequency, deloads, sleep, and the signals worth tracking.',
  },
  {
    slug: 'programs',
    name: 'Programs',
    title: 'Strength Programs for Masters Athletes',
    description:
      'Structured strength programs built for lifters 50+: realistic progression, built-in recovery, and 12-week blocks designed for longevity.',
    intro:
      'Most popular programs were written for 25-year-olds and quietly assume 25-year-old recovery. These guides cover how masters programming differs — progression speed, volume, deload timing — and how to run a 12-week block that ends with you stronger, not injured.',
  },
  {
    slug: 'longevity',
    name: 'Longevity',
    title: 'Training for Longevity',
    description:
      'Strength, muscle, and bone are the retirement account nobody talks about. How training after 50 changes what your 70s and 80s look like.',
    intro:
      'The strongest argument for lifting after 50 is not how you look this summer. It is carrying your own groceries at 80. These guides cover what strength and muscle actually do for the decades ahead, and how to train so the account keeps compounding.',
  },
];

export function getCluster(slug: string): Cluster | undefined {
  return CLUSTERS.find((c) => c.slug === slug);
}
