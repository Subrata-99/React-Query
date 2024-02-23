import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { addPost, fetchPosts, fetchTags } from '../API/api'

const PostList = () => {

    const { data: postData, isError, isLoading, error } = useQuery({
        queryKey: ["posts"], // we use array because we can have multiple dependencies, for example, if we want to implement pagination we can pass the page number to this array so that it create unique queries for each request.
        queryFn: fetchPosts
    })
    const { data: tagsData } = useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags
    })

    const { mutate,
        isError: isPostError,
        isPending,
        error: postError,
        reset
    } = useMutation({ // useMutaion is used to make post requests
        mutationFn: addPost
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const tags = Array.from(formData.keys()).filter(key => formData.get(key) === "on");
        console.log('Form title, tags: ', title, tags);
        if (!title || !tags) return

        mutate({ id: postData.length + 1, title, tags })

        e.target.reset()
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder="Enter your post..."
                    className="postbox"
                    name="title"
                />
                <div className="tags">
                    {tagsData?.map(tag =>
                        <div key={tag}>
                            <input name={tag} id={tag} type='checkbox' />
                            <label htmlFor={tag}>{tag}</label>
                        </div>
                    )}
                </div>
                <button>Post</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {isError && <p>{error.message}</p>}

            {postData?.length > 0 && postData.map((post) =>
                <div className='post' key={post.id}>
                    <div>{post.title}</div>
                    {post.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
            )}
        </div>
    )
}

export default PostList