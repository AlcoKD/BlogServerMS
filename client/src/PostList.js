import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
    const [posts, setPosts] = useState({}); //states
    //function to fetch some datas
    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');
        setPosts(res.data);
    }
    //call the datas from fetch with useEffect
    useEffect(() => {
        fetchPosts();
    }, []);
    //map over the data that we got
    const renderedPosts = Object.values(posts).map(post => {
        return (
        <div 
            className='card' 
            style={{width: '30%', marginBottom: '20px'}}
             key={post.id}
        >
            <div className='card-body'>
                <h3>{post.title}</h3>
                <CommentList comments={post.comments}/>
                <CommentCreate postId={post.id} />
            </div>
        </div>
        )
    });
    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
            {renderedPosts}
        </div>
    );
};

export default PostList;