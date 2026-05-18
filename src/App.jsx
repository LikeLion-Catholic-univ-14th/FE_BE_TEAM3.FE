import Header from './components/Header'
import Hero from './components/Hero'
import ExcuseCard from './components/ExcuseCard'
import ExcuseForm from './components/ExcuseForm'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import { useState } from 'react'

function App() {

  const [excuses, setExcuses] = useState([
    {
      id: 1,
      nickname: '익명1',
      emotion: '🤡',
      content: '지하철에 외계인이 타서 늦었습니다.',
      likes: 12,
      comments: 4,
      time: '5분 전'
    },

    {
      id: 2,
      nickname: '익명2',
      emotion: '😭',
      content: '강아지가 알람을 껐어요.',
      likes: 8,
      comments: 2,
      time: '10분 전'
    },

    {
      id: 3,
      nickname: '익명3',
      emotion: '🥲',
      content: '교수님 메일이 스팸함에 들어갔습니다.',
      likes: 20,
      comments: 7,
      time: '15분 전'
    }
  ])

  const addExcuse = (newExcuse) => {

    setExcuses([newExcuse, ...excuses])

  }

  return (
    <div>

      <Header />

      <Hero />

      <main className="main-layout">

        {/* 왼쪽 영역 */}
        <section className="left-section">

          <h2 className="section-title">
            실시간 핑계 피드
          </h2>

          {
            excuses.map((item) => (
              <ExcuseCard
                key={item.id}
                excuse={item}
              />
            ))
          }

          <ExcuseForm addExcuse={addExcuse} />

        </section>

        {/* 오른쪽 영역 */}
        <Sidebar />

      </main>

      <Footer />

    </div>
  )
}

export default App