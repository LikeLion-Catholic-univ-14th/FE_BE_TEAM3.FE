import { useEffect, useState } from 'react'

function VoteBox() {

  const [vote, setVote] = useState(null)

  // 현재 투표 조회
  const fetchVote = async () => {

    try {

      const res = await fetch(
        'http://localhost:8080/api/votes/current'
      )

      const data = await res.json()

      console.log(data)

      setVote(data)

    } catch (err) {

      console.log(err)

    }

  }

  // 투표
  const submitVote = async (option) => {

    try {

      await fetch(
        `http://localhost:8080/api/votes/${vote.id}/vote`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            option: option,
          }),
        }
      )

      // 다시 조회
      fetchVote()

    } catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {

    fetchVote()

  }, [])

  if (!vote) {

    return (
      <div className="card">
        투표 불러오는 중...
      </div>
    )

  }

  return (
    <div className="card">

      <h3>
        오늘의 투표
      </h3>

      <h4>
        {vote.title}
      </h4>

      <button
        onClick={() => submitVote('A')}
      >
        A. {vote.optionA}
        ({vote.countA})
      </button>

      <button
        onClick={() => submitVote('B')}
      >
        B. {vote.optionB}
        ({vote.countB})
      </button>

    </div>
  )
}

export default VoteBox