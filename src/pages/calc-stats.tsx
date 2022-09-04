import { NextPage } from 'next'
import { useRecoilState } from 'recoil'
import { CalcStatsTemplate } from '../components/templates/CalcStatsTemplate'
import { levelState, selectedNatureState, selectedPokemonState, statsState } from '../store'
import { Stat } from '../types'

const CalcStats: NextPage = () => {
  const [selectedPokemon, setSelectedPokemon] = useRecoilState(selectedPokemonState)
  const [selectedNature, setSelectedNature] = useRecoilState(selectedNatureState)
  const [level, setLevel] = useRecoilState(levelState)
  const [stats, setStats] = useRecoilState(statsState)

  const updateStats = (stats: Stat[]) => {
    setStats(stats)
  }

  const updateLevel = (level: number | '') => {
    setLevel(level)
  }

  return (
    <CalcStatsTemplate
      selectedPokemon={selectedPokemon}
      selectedNature={selectedNature}
      level={level}
      stats={stats}
      updateLevel={updateLevel}
      updateStats={updateStats}
    />
  )
}

export default CalcStats
