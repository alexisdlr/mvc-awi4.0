import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import './Comments.scss'
import defaultPic from '../../assets/userPicDefault.png'
import { makeRequest } from '../../axios';
import moment from 'moment'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'

function Comments({postId}) {
    const [input, setInput] = useState('')
    const {currentUser} = useContext(AuthContext)


    const queryClient = useQueryClient() 

    const mutation = useMutation((comment) => {
      return makeRequest.post('/comments', comment)
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments'])
      },
    })

    const handleClick = async (e) => {
      e.preventDefault()
      mutation.mutate({desc: input, postId})
      setInput('')
      
    }

    const { isLoading, error, data } = useQuery({
      queryKey: ["comments"],
      queryFn: () =>
        makeRequest.get("/comments?postId="+postId).then((res) => {
          return res.data
        })
    })

  return (
    <div className='comments'>
       <div className="write">
        <img src={currentUser.profilePic === null ? defaultPic : currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" onChange={(e) => setInput(e.target.value)} value={input} />
        <button onClick={handleClick}>Send</button>
      </div>
        {
        error
        ? "something went wrong"
        : isLoading
        ? "loading"
        :  data.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePic === null ? defaultPic : currentUser.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div> 
      ))}
    </div>
  )
}

export default Comments