import Header from './components/Header'
import Hero from './components/Hero'
import ExcuseCard from './components/ExcuseCard'
import ExcuseForm from './components/ExcuseForm'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import api from './api/axios.js'
import { useState, useEffect } from 'react'

function App() {

  const [excuses, setExcuses] = useState([])

  // 전체 조회
  const fetchExcuses = async () => {

    try {

      const res = await fetch(
        'http://13.125.91.73:8080/api/excuses'
      )

      const data = await res.json()

      setExcuses(data)

    } catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {

    fetchExcuses()

  }, [])

  // 게시글 추가
  const addExcuse = async (newExcuse) => {

    try {

      await fetch(
        'http://13.125.91.73:8080/api/excuses',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            nickname: newExcuse.nickname,
            password: newExcuse.password,
            content: newExcuse.content,
            category: newExcuse.category,
            emotionTag: newExcuse.emotionTag,
          }),
        }
      )

      fetchExcuses()

    } catch (err) {

      console.log(err)

    }

  }

  // 좋아요
  const handleLike = async (id) => {

    try {

      await fetch(
        `http://13.125.91.73:8080/api/excuses/${id}/like`,
        {
          method: 'POST',
        }
      )

      fetchExcuses()

    } catch (err) {

      console.log(err)

    }

  }

  // 삭제
  const handleDelete = async (id) => {

    const password = prompt('비밀번호를 입력하세요')

    if (!password) return

    try {

      const res = await fetch(
        `http://13.125.91.73:8080/api/excuses/${id}`,
        {
          method: 'DELETE',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            password: password,
          }),
        }
      )

      if (!res.ok) {

        alert('비밀번호가 틀렸습니다')
        return

      }

      fetchExcuses()

    } catch (err) {

      console.log(err)

    }

  }

  return (

    <div>

      <Header />

      <Hero />

      <main className="main-layout">

        <section className="left-section">

          <h2 className="section-title">
            실시간 핑계 피드
          </h2>

          {
            excuses.map((item) => (
              <ExcuseCard
                key={item.id}
                excuse={item}
                onLike={handleLike}
                onDelete={handleDelete}
              />
            ))
          }

          <ExcuseForm addExcuse={addExcuse} />

        </section>

        <Sidebar />

      </main>

      <Footer />

    </div>

  )

}

export default App