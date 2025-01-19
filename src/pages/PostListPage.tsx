import React, { useEffect, useState } from 'react'
import { Post } from '../types/Post';

// interface Post {
//     id: number;
//     title: string;
//     content: string;
// }

const PostListPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    //初回マウント時、APIからデータを取得
    useEffect(() => {
        fetch('http://localhost:5174/posts/')
            // .then((res) => console.log(res))
            .then((res) => res.json())
            .then((data: Post[]) => {
                console.log(data);
                setPosts(data);
            })
            .catch((err) => {
                console.error('Railed to fetch posts:', err);
            });
    }, []);

    // 削除機能
    const deletesPost = async (id: number) => {
        await fetch(`http://localhost:5174/posts/${id}`, {
            method: 'DELETE',
        });
        // ローカルステートからも削除
        setPosts(posts.filter((post) => post.id !== id));
    };

    return (
        <div>
            <h2>投稿一覧</h2>
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <button onClick={() => deletesPost(post.id)}>削除</button>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default PostListPage;