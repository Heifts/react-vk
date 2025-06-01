import React from 'react';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import Table from './components/Table/Table';
import Form from './components/Form/Form';
import { addPost } from './api/api';
import type { Post } from './api/api'; 
import { Container, CssBaseline, Paper, Typography } from '@mui/material';

const App: React.FC = () => {
  const { items, loading, hasMore, loadItems, addNewItem } = useInfiniteScroll();

  const handleAddPost = async (postData: Omit<Post, 'id'>) => {
    const newPost = await addPost(postData);
    addNewItem(newPost);
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 3 }}>
        Posts Table
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Form onSubmit={handleAddPost} />
      </Paper>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Table 
          items={items} 
          loading={loading} 
          hasMore={hasMore} 
          loadMore={loadItems} 
        />
      </Paper>
    </Container>
  );
};

export default App;
