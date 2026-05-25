import { useState, useEffect } from 'react'

function ExcuseCard({
  excuse,
  onLike,
  onDelete,
}) {

  const [showComments, setShowComments] =
    useState(false)

  const [showCommentForm, setShowCommentForm] =
    useState(false)

  const [comments, setComments] = useState([])

  const [commentNickname, setCommentNickname] =
    useState('')

  const [commentContent, setCommentContent] =
    useState('')

  const [isEditing, setIsEditing] =
    useState(false)

  const [editNickname, setEditNickname] =
    useState(excuse.nickname)

  const [editPassword, setEditPassword] =
    useState('')

  const [editContent, setEditContent] =
    useState(excuse.content)

  // 댓글 조회
  const fetchComments = async () => {

    try {

      const res = await fetch(
        `http://localhost:8080/api/excuses/${excuse.id}/comments`
      )

      const data = await res.json()

      setComments(data)

    } catch (err) {

      console.log(err)

    }

  }

  // 댓글 등록
  const handleCommentSubmit = async () => {

    try {

      await fetch(
        `http://localhost:8080/api/excuses/${excuse.id}/comments`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            nickname: commentNickname,
            content: commentContent,
          }),
        }
      )

      setCommentNickname('')
      setCommentContent('')

      fetchComments()

    } catch (err) {

      console.log(err)

    }

  }

  // 수정
  const handleEditSubmit = async () => {

    try {

      const res = await fetch(
        `http://localhost:8080/api/excuses/${excuse.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            nickname: editNickname,
            password: editPassword,
            content: editContent,
            category: excuse.category,
            emotionTag: excuse.emotionTag,
          }),
        }
      )

      if (!res.ok) {

        alert('수정 실패')
        return

      }

      setIsEditing(false)

      window.location.reload()

    } catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {

    if (showComments) {

      fetchComments()

    }

  }, [showComments])

  return (

    <div className="card">

      <div className="card-header">

        <h3>
          {excuse.nickname}
          {' '}
          {excuse.emotionTag}
        </h3>

        <span>
          {excuse.createdAt}
        </span>

      </div>

      <p className="content">
        {excuse.content}
      </p>

      <div className="button-row">

        <button
          onClick={() => onLike(excuse.id)}
        >
          👍 {excuse.likes}
        </button>

        <button
          onClick={() =>
            setShowComments(!showComments)
          }
        >
          💬 댓글 보기
        </button>

        <button
          onClick={() =>
            setShowCommentForm(!showCommentForm)
          }
        >
          ✍️ 댓글 작성
        </button>

        <div className="right-buttons">

          <button
            onClick={() =>
              setIsEditing(!isEditing)
            }
          >
            ✏️ 수정
          </button>

          <button
            onClick={() =>
              onDelete(excuse.id)
            }
          >
            🗑 삭제
          </button>

        </div>

      </div>

      {/* 수정창 */}
      {
        isEditing && (

          <div className="edit-box">

            <input
              type="text"
              placeholder="닉네임"
              value={editNickname}
              onChange={(e) =>
                setEditNickname(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="비밀번호"
              value={editPassword}
              onChange={(e) =>
                setEditPassword(e.target.value)
              }
            />

            <textarea
              placeholder="내용 수정"
              value={editContent}
              onChange={(e) =>
                setEditContent(e.target.value)
              }
            />

            <button
              onClick={handleEditSubmit}
            >
              수정 완료
            </button>

          </div>

        )
      }

      {/* 댓글 작성 */}
      {
        showCommentForm && (

          <div className="comment-form">

            <input
              type="text"
              placeholder="닉네임"
              value={commentNickname}
              onChange={(e) =>
                setCommentNickname(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="댓글 입력"
              value={commentContent}
              onChange={(e) =>
                setCommentContent(e.target.value)
              }
            />

            <button
              onClick={handleCommentSubmit}
            >
              댓글 등록
            </button>

          </div>

        )
      }

      {/* 댓글 목록 */}
      {
        showComments && (

          <div className="comment-list">

            {
              comments.map((comment) => (

                <div
                  key={comment.id}
                  className="comment-item"
                >

                  <strong>
                    {comment.nickname}
                  </strong>

                  <p>
                    {comment.content}
                  </p>

                  <small>
                    {comment.createdAt}
                  </small>

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  )

}

export default ExcuseCard