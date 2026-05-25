import { useState } from 'react'

function ExcuseForm(props) {

  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [content, setContent] = useState('')
  const [emotionTag, setEmotionTag] = useState('🤡')

  const handleSubmit = () => {

    if (
      nickname.trim() === '' ||
      password.trim() === '' ||
      content.trim() === ''
    ) {
      alert('닉네임, 비밀번호, 핑계를 입력해주세요!')
      return
    }

    const newExcuse = {

      id: Date.now(),

      nickname: nickname,

      password: password,

      content: content,

      category: '기타',

      emotionTag: emotionTag,

      // UI용
      likes: 0,
      comments: 0,
      time: '방금 전'

    }

    props.addExcuse(newExcuse)

    setNickname('')
    setPassword('')
    setContent('')
    setEmotionTag('🤡')

  }

  return (
    <div className="card">

      <h2 className="form-title">
        핑계 올리기
      </h2>

      <input
        type="text"
        placeholder="닉네임"
        className="form-input"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <textarea
        placeholder="오늘의 핑계를 입력하세요..."
        className="form-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="emotion-box">

        <span onClick={() => setEmotionTag('😀')}>
          😀
        </span>

        <span onClick={() => setEmotionTag('😭')}>
          😭
        </span>

        <span onClick={() => setEmotionTag('😡')}>
          😡
        </span>

        <span onClick={() => setEmotionTag('🥲')}>
          🥲
        </span>

        <span onClick={() => setEmotionTag('🤡')}>
          🤡
        </span>

      </div>

      <button
        className="submit-btn"
        onClick={handleSubmit}
      >
        등록하기
      </button>

    </div>
  )
}

export default ExcuseForm