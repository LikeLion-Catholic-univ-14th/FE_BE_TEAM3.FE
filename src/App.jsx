import Header from './components/Header'
import Hero from './components/Hero'
import ExcuseCard from './components/ExcuseCard'
import ExcuseForm from './components/ExcuseForm'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import { useState, useEffect } from 'react'

function App() {

  const [excuses, setExcuses] = useState([])

  const fetchExcuses = async () => {

    try {

      const res = await fetch(
        'http://localhost:8080/api/excuses'
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

  const addExcuse = async (newExcuse) => {

    try {

      await fetch(
        'http://localhost:8080/api/excuses',
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

  const handleLike = async (id) => {

    try {

      await fetch(
        `http://localhost:8080/api/excuses/${id}/like`,
        {
          method: 'POST',
        }
      )

      fetchExcuses()

    } catch (err) {

      console.log(err)

    }

  }

  const handleDelete = async (id) => {

    const updated = excuses.filter(
      (item) => item.id !== id
    )

    setExcuses(updated)

    try {

      await fetch(
        `http://localhost:8080/api/excuses/${id}`,
        {
          method: 'DELETE',
        }
      )

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