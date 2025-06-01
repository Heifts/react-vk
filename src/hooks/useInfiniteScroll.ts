import { useState, useEffect, useCallback } from 'react';
import { fetchPosts } from '../api/api';

export const useInfiniteScroll = () => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadItems = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const newItems = await fetchPosts(page);
      setItems(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
      setHasMore(newItems.length > 0);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    loadItems();
  }, []);

  const addNewItem = (item: any) => {
    setItems(prev => [item, ...prev]);
  };

  return { items, loading, hasMore, loadItems, addNewItem };
};