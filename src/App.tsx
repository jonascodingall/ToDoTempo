import './App.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TodoPage from "./pages/ToDoPage.tsx";
import HomePage from "./pages/HomePage.tsx";
function App() {

  const queryClient = new QueryClient();
  return (
      <QueryClientProvider client={queryClient}>
          <Router>
              <Routes>
                  <Route path="/" element={<HomePage></HomePage>}/>
                  <Route path="/todo" element={<TodoPage></TodoPage>}/>
              </Routes>
          </Router>
      </QueryClientProvider>
  )
}

export default App
