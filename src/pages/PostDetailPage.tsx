import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Post } from '../types/Post';
import axios from 'axios';

const PostDetailPage: React.FC = () => {
    // URLパラメータ : id を取得
    const { id } = useParams();
    // 取得した投稿データをステート管理
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState('');
    // ローデlング状態を管理
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // idがない場合は処理を終了
        if (!id) return;

        // posts/:id のエンドポイントにリクエストを送り、投稿1件を取得
        fetch(`http://localhost:5174/posts/${id}`)
            .then((res) => {
                console.log(id);
                console.log(res);
                if (!res.ok) {
                    throw new Error('Post not found');
                }
                return res.json();
            })
            .then((data: Post) => setPost(data))
            .catch((err) => {
                console.error(err);
                setError('投稿が見つかりませんでした');
            });
    }, [id]);

    // データ取得が完了していないときにローディング
    if (!post && !error) {
        return <div>Loading...</div>;
    }

    // エラー発生時
    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <h2>{post?.title}</h2>
            <p>{post?.content}</p>
            <p><small>Created at: {post?.createdAt}</small></p>
        </div>
    )
}

export default PostDetailPage;