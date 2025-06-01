import React from 'react';
import { useForm } from 'react-hook-form';
import type { Post } from '../../api/api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface FormProps {
  onSubmit: (data: Omit<Post, 'id'>) => Promise<void>;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm<Omit<Post, 'id'>>();

  const getHelperText = (error: any): string | undefined => {
    return typeof error?.message === 'string' ? error.message : undefined;
  };

  const submitHandler = async (data: Omit<Post, 'id'>) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Post
      </Typography>
      
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        {...register('title', { required: 'Title is required' })}
        error={!!errors.title}
        helperText={getHelperText(errors.title)}
      />
      
      <TextField
        label="Author"
        fullWidth
        margin="normal"
        {...register('author', { required: 'Author is required' })}
        error={!!errors.author}
        helperText={getHelperText(errors.author)}
      />
      
      <TextField
        label="Content"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        {...register('content', { 
          required: 'Content is required', 
          minLength: { 
            value: 10, 
            message: 'Content must be at least 10 characters' 
          } 
        })}
        error={!!errors.content}
        helperText={getHelperText(errors.content)}
      />
      
      <TextField
        label="Category"
        fullWidth
        margin="normal"
        {...register('category', { required: 'Category is required' })}
        error={!!errors.category}
        helperText={getHelperText(errors.category)}
      />
      
      <TextField
        label="Date"
        fullWidth
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...register('date', { required: 'Date is required' })}
        error={!!errors.date}
        helperText={getHelperText(errors.date)}
      />
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </Box>
  );
};

export default Form;