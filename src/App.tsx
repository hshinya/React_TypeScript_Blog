import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostNewPage from "./pages/PostNewPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostEditPage from "./pages/PostEditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 一覧 */}
        <Route path="/posts" element={<PostListPage />} />
        {/* 詳細ページ */}
        <Route path="/posts/:id" element={<PostDetailPage />} />
        {/* 新規作成 */}
        <Route path="/posts/new" element={<PostNewPage />} />
        {/* 編集 */}
        <Route path="/posts/:id/edit" element={<PostEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
