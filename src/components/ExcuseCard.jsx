import { useState } from 'react'

function ExcuseCard(props) {

  const { excuse } = props

  const [likes, setLikes] = useState(
    excuse.likes
    )

  return (
    <div className="card">

      <div className="card-top">

        <div className="user-info">

          <h3>{excuse.nickname}</h3>

          <span className="emotion">
            {excuse.emotion}
          </span>

        </div>

        <span className="date">
          {excuse.time}
        </span>

      </div>

      <p className="card-content">
        {excuse.content}
      </p>

      <div className="card-bottom">

        <button onClick={() => setLikes(likes + 1)}>
           👍 {likes}
        </button>

        <span className="comment-count">
          💬 {excuse.comments}
        </span>

      </div>

    </div>
  )
}

export default ExcuseCard