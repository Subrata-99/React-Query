import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "./API/api"
import PostList from "./Component/PostList";
import "./App.css"


function App() {

  // const { data, isLoading, } = useQuery({
  //   queryKey: ["posts"], //This is unique key to identify our queries
  //   queryFn: fetchPosts//Where we will make our asynchronous request
  // })

  // console.log('data---', data, isLoading);

  return (
    <>
      <div>
        <h2 className="title">My Posts</h2>
        <PostList />
      </div>
    </>
  )
}

export default App
