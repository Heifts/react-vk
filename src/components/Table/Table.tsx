import React, { useEffect, useRef } from 'react';
import type { Post } from '../../api/api';
import Loader from '../Loader/Loader';

interface TableProps {
  items: Post[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

const Table: React.FC<TableProps> = ({ items, loading, hasMore, loadMore }) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading, loadMore]);

  if (items.length === 0 && !loading) {
    return <div>No items found</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {items.length > 0 &&
              Object.keys(items[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((value, i) => (
                <td key={i}>{String(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={observerRef} style={{ height: '20px', margin: '10px 0' }}>
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Table;