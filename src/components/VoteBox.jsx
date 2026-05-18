import { useState } from 'react'

function VoteBox() {

  const [voteA, setVoteA] = useState(4)
  const [voteB, setVoteB] = useState(6)

  const totalVotes = voteA + voteB

  const percentA = Math.round((voteA / totalVotes) * 100)
  const percentB = Math.round((voteB / totalVotes) * 100)

  return (
    <div className="side-box">

      <h3>진행 중인 투표</h3>

      <div className="vote-item">

        <div className="vote-top">

          <p>
            A. 배탈 났다
            {voteA > voteB && ' 👑'}
          </p>

          <span>
            {voteA}표 ({percentA}%)
          </span>

        </div>

        <button onClick={() => setVoteA(voteA + 1)}>
          투표하기
        </button>

      </div>

      <div className="vote-item">

        <div className="vote-top">

          <p>
            B. 지하철 거꾸로 탐
            {voteB > voteA && ' 👑'}
          </p>

          <span>
            {voteB}표 ({percentB}%)
          </span>

        </div>

        <button onClick={() => setVoteB(voteB + 1)}>
          투표하기
        </button>

      </div>

    </div>
  )
}

export default VoteBox