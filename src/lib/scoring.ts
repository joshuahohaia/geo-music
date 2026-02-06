/**
 * Scoring configuration
 */
export const SCORING_CONFIG = {
  MAX_SCORE: 5000,
  PERFECT_DISTANCE_KM: 0.15, // 150 meters for max score
  DECAY_RATE: 2000, // Controls how fast score drops with distance
  YEAR_MAX_SCORE: 1000, // Max bonus for correct year
};

/**
 * Calculate the great-circle distance between two points using Haversine formula
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const EARTH_RADIUS_KM = 6371;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

/**
 * Calculate score based on distance using exponential decay
 * - 0-150m: 5000 points (perfect)
 * - ~500km: ~3900 points
 * - ~1000km: ~3000 points
 * - ~2000km: ~1800 points
 * - ~5000km: ~400 points
 *
 * @returns Score from 0 to 5000
 */
export function calculateScore(distanceKm: number): number {
  const { MAX_SCORE, PERFECT_DISTANCE_KM, DECAY_RATE } = SCORING_CONFIG;

  if (distanceKm <= PERFECT_DISTANCE_KM) {
    return MAX_SCORE;
  }

  const score = MAX_SCORE * Math.exp(-distanceKm / DECAY_RATE);
  return Math.max(0, Math.round(score));
}

/**
 * Format distance for display
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  if (distanceKm < 100) {
    return `${distanceKm.toFixed(1)} km`;
  }
  return `${Math.round(distanceKm).toLocaleString()} km`;
}

/**
 * Calculate year bonus score
 * - Exact year: 1000 points
 * - 1 year off: 750 points
 * - 2 years off: 500 points
 * - 3 years off: 250 points
 * - 4+ years off: 0 points
 */
export function calculateYearScore(guessedYear: number | undefined, actualYear: number | undefined): number {
  if (!guessedYear || !actualYear) return 0;

  const difference = Math.abs(guessedYear - actualYear);
  const { YEAR_MAX_SCORE } = SCORING_CONFIG;

  if (difference === 0) return YEAR_MAX_SCORE;
  if (difference === 1) return Math.round(YEAR_MAX_SCORE * 0.75);
  if (difference === 2) return Math.round(YEAR_MAX_SCORE * 0.5);
  if (difference === 3) return Math.round(YEAR_MAX_SCORE * 0.25);
  return 0;
}

/**
 * Get score tier for UI feedback
 */
export function getScoreTier(score: number): {
  tier: "perfect" | "excellent" | "good" | "fair" | "poor";
  color: string;
  label: string;
} {
  if (score >= 4900)
    return { tier: "perfect", color: "text-yellow-500", label: "Perfect!" };
  if (score >= 4000)
    return { tier: "excellent", color: "text-pistachio", label: "Excellent!" };
  if (score >= 2500)
    return { tier: "good", color: "text-lavender", label: "Good!" };
  if (score >= 1000)
    return { tier: "fair", color: "text-peach", label: "Fair" };
  return { tier: "poor", color: "text-destructive", label: "Far off" };
}
