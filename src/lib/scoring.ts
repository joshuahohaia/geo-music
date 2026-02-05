/**
 * Scoring configuration
 */
export const SCORING_CONFIG = {
  MAX_SCORE: 5000,
  PERFECT_DISTANCE_KM: 0.15, // 150 meters for max score
  DECAY_RATE: 2000, // Controls how fast score drops with distance
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
