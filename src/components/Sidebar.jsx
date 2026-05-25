import { useEffect, useState } from 'react'
import VoteBox from './VoteBox'

function Sidebar() {

  const [hallOfFame, setHallOfFame] = useState([])

  const [battle, setBattle] = useState(null)

  // 명예의 전당 조회
  const fetchHallOfFame = async () => {

    try {

      const res = await fetch(
        'http://localhost:8080/api/excuses/hall-of-fame'
      )

      const data = await res.json()

      console.log(data)

      setHallOfFame(data)

    } catch (err) {

      console.log(err)

    }

  }

  // 랜덤 배틀 조회
  const fetchBattle = async () => {

    try {

      const res = await fetch(
        'http://localhost:8080/api/excuses'
      )

      const data = await res.json()

      if (data.length >= 2) {

        setBattle([
          data[0],
          data[1],
        ])

      }

    } catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {

    fetchHallOfFame()

    fetchBattle()

  }, [])

  return (

    <aside className="sidebar">

      {/* 명예의 전당 */}
      <div className="card">

        <h3>
          명예의 전당
        </h3>

        {
          hallOfFame.length === 0 ? (

            <p>
              불러오는 중...
            </p>

          ) : (

            hallOfFame.map((item, index) => (

              <p key={item.id}>

                {
                  index === 0 && '🥇 '
                }

                {
                  index === 1 && '🥈 '
                }

                {
                  index === 2 && '🥉 '
                }

                {item.content}

              </p>

            ))

          )
        }

      </div>

      {/* 오늘의 투표 */}
      <VoteBox />

      {/* 핑계 배틀 */}
      <div className="card battle-box">

        <h3>
          핑계 배틀
        </h3>

        <p>
          🔥 오늘의 랜덤 대결
        </p>

        {
          battle ? (

            <>

              <button>
                {battle[0].content}
              </button>

              <h3>
                VS
              </h3>

              <button>
                {battle[1].content}
              </button>

            </>

          ) : (

            <p>
              불러오는 중...
            </p>

          )
        }

      </div>

    </aside>

  )

}

export default Sidebar