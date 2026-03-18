

interface CacheEntry {
    value: any;
    eat: number | null;
}

class TTLCache {
    private cache: Map<string, any>;
    private ttl: number | null;
    /**
     * @param ttl cache clear time interval in minutes.
     */
    constructor(ttl: number | null = null) {
        this.cache = new Map();
        this.ttl = ttl;
    }

    /**
     *
     * @param key
     * @param value
     * @param ttl invalidation time interval in minutes
     */
    set(key: any, value: any, ttl: number | null = null) {
        ttl = ttl || this.ttl;
        const eat = ttl ? Date.now() + ttl * 60 * 1000 : null;
        this.cache.set(String(key), {
            eat: eat,
            value: value,
        });
    }

    has(key: any): boolean {
        return this.get(key) ? true : false;
    }

    get(key: any) {
        const entry: CacheEntry | undefined = this.cache.get(String(key));
        if (entry && !entry.eat) {
            return entry.value;
        }

        if (entry && entry.eat && Date.now() < entry.eat) {
            return entry.value;
        }
        this.cache.delete(key);
        return null;
    }

    cleanup() {
        this.cache.clear();
    }

    find<T = any>(checker: (value: T) => boolean): T | null {
        for (const [, entry] of this.cache) {
            const value = (entry as CacheEntry).value as T;
            if (checker(value)) {
                return value;
            }
        }
        return null;
    }

    delete(key: any) {
        this.cache.delete(String(key));
    }
}

const cache = {
    users: new TTLCache(5), // key : userId, value : user
    stores: new TTLCache(10), // key : storeId, value : store
    products: new TTLCache(1), // key : productId, value : product
    ratings : new TTLCache(10), // key : <productId_userId>, value : rating
};

export default cache;
