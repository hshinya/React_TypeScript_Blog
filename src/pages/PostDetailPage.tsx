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
    // ローディング状態を管理
    const [loading, setLoading] = useState(true);

    // useEffect関連からaxiosの形に変更する
    useEffect(() => {
        // マウント(または id 変更)時に投稿詳細を取得
        const fetchPost = async () => {
            try {
                // idがない場合は処理を終了
                if (!id) return;

                // axiosでGETリクエスト
                const response = await axios.get<Post>(`http://localhost:5175/posts/${id}`);
                //取得したデータはresponse.dataに格納される
                setPost(response.data);
            } catch (err) {
                console.error(err);
                setError('投稿が見つかりませんでした。');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();

    }, [id]);

    // ローディング中
    if (loading) {
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