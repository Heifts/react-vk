import axios from 'axios';

const API_URL = '/api'

export interface Post {
  id: string;
  title: string;
  author: string;
  content: string;
  category: string;
  date: string;
  views?: number;
  [key: string]: any;
}

export const fetchPosts = async (page: number, limit: number = 5): Promise<Post[]> => {
  const response = await axios.get(`${API_URL}/posts`, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return response.data;
};

export const addPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await axios.post(`${API_URL}/posts`, post);
  return response.data;
};