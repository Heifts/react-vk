import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';


const mockPosts = [
  {
    id: "1",
    title: "Test Post",
    author: "Test Author",
    content: "Test content",
    category: "Test",
    date: "2023-01-01"
  }
];

const server = setupServer(
  http.get('http://localhost:3001/posts', () => {
    return HttpResponse.json(mockPosts);
  }),
  http.post('http://localhost:3001/posts', async ({ request }) => {
    const newPost = await request.json() as Omit<typeof mockPosts[0], 'id'>;
    return HttpResponse.json({ 
      id: "2", 
      ...newPost 
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders table with mock data', async () => {
  render(<App />);
  
  await waitFor(() => {
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });
});

test('handles form submission', async () => {
  render(<App />);
  

  const titleInput = screen.getByLabelText('Title');
  const authorInput = screen.getByLabelText('Author');
  const contentInput = screen.getByLabelText('Content');
  const categoryInput = screen.getByLabelText('Category');
  const dateInput = screen.getByLabelText('Date');
  const submitButton = screen.getByRole('button', { name: /submit/i });


  await userEvent.type(titleInput, 'New Post');
  await userEvent.type(authorInput, 'New Author');
  await userEvent.type(contentInput, 'Content of new post');
  await userEvent.type(categoryInput, 'New Category');
  await userEvent.type(dateInput, '2023-01-02');


  await userEvent.click(submitButton);

 
  await waitFor(() => {
    expect(screen.getByText('New Post')).toBeInTheDocument();
  });
});