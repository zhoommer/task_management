
export default function useTaskCard() {

  const priorityLevel = (priority: 'low' | 'medium' | 'high' | 'critical') => {
    switch (priority) {
      case priority = 'low':
        return <span className="bg-green-300 rounded text-xs px-2 py-1">Düşük</span>
      case priority = 'medium':
        return <span className="bg-yellow-300 rounded text-xs px-2 py-1">Orta</span>
      case priority = 'high':
        return <span className="bg-orange-300 rounded text-xs px-2 py-1">Yüksek</span>
      case priority = 'critical':
        return <span className="bg-red-300 rounded px-2 py-1">Kritik</span>
      default:
        break;
    }
  }

  const cardGradient = (status: 'waiting' | 'inprogress' | 'test' | 'done') => {
    switch (status) {
      case status = 'waiting':
        return 'from-orange-300 to-red-400';
      case status = 'inprogress':
        return 'from-yellow-300 to-orange-400';
      case status = 'test':
        return 'from-blue-300 to-purple-400';
      case status = 'done':
        return 'from-sky-300 to-green-300';
      default:
        break;
    }
  }

  return {
    priorityLevel,
    cardGradient,
  }
}
