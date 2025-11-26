import { CacheOptions } from "../types";

/**
 * LRU (Least Recently Used) Cache implementation
 * Provides efficient caching with automatic eviction of least recently used entries
 */
export class LRUCache<K, V> {
  private cache: Map<K, { value: V; timestamp: number }>;
  private maxSize: number;
  private ttl: number | undefined;
  private enabled: boolean;

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize || 1000;
    this.ttl = options.ttl;
    this.enabled = options.enabled !== false;
    this.cache = new Map();
  }

  /**
   * Get value from cache
   */
  get(key: K): V | undefined {
    if (!this.enabled) return undefined;

    const entry = this.cache.get(key);
    if (!entry) return undefined;

    // Check TTL
    if (this.ttl && Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return undefined;
    }

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.value;
  }

  /**
   * Set value in cache
   */
  set(key: K, value: V): void {
    if (!this.enabled) return;

    // Remove if exists (to update position)
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // Add new entry
    this.cache.set(key, { value, timestamp: Date.now() });

    // Evict least recently used if over size limit
    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
  }

  /**
   * Check if key exists in cache
   */
  has(key: K): boolean {
    if (!this.enabled) return false;

    const entry = this.cache.get(key);
    if (!entry) return false;

    // Check TTL
    if (this.ttl && Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Enable cache
   */
  enable(): void {
    this.enabled = true;
  }

  /**
   * Disable cache
   */
  disable(): void {
    this.enabled = false;
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; maxSize: number; enabled: boolean } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      enabled: this.enabled,
    };
  }
}

/**
 * Global cache instance for humanize-number
 */
export const globalCache = new LRUCache<string, string>({
  maxSize: 1000,
  enabled: true,
});

/**
 * Generate cache key from parameters
 */
export function generateCacheKey(
  value: number,
  formatMethod: string,
  options: any
): string {
  return `${formatMethod}:${value}:${JSON.stringify(options)}`;
}
