import HallOfFame from './HallOfFame'
import VoteBox from './VoteBox'
import BattleBox from './BattleBox'

function Sidebar() {
  return (
    <aside className="right-section">

      <HallOfFame />

      <VoteBox />

      <BattleBox />

    </aside>
  )
}

export default Sidebar