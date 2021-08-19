import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import App from '../App';
import CommentList from '../components/CommentList'
import CommentInput from '../components/CommentInput'

const server = setupServer(
  rest.get('/getComments', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({
        id: 15,
        name: "yogi",
        message: "commenting\n",
        created: "2021-08-19 18:17:26"}))
  }),
)

/*
Test 1
input: mock data
testing: to check if the tests will be checking status
output: should pass test if the mock server is up
*/
test('check server', async () => {
  server.use(
    rest.get('/getComments', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )
})

/*
Test 2
input: App.js
test: see if the component renders by checking the comment textbox
output: comment text in button on the screen
*/
test('loads items eventually', async () => {
  render(<App />)
  const linkElement = screen.getByText('Comment');
  expect(linkElement).toBeInTheDocument();
})

/*
Test 3
input: author and comment as null
output: modal/alert
test: checking to see if the error modal comes up
*/
test('missing username or comment', () =>{
  render(<App />)
  const jsdomAlert = window.alert;
  window.alert = () => {};
  fireEvent.click(screen.getByText('Comment'))
  window.alert = jsdomAlert;
})


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
