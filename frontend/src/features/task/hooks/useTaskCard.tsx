
export default function useTaskCard() {

  const priorityLevel = (priority: 'low' | 'medium' | 'high' | 'critical') => {
    switch (priority) {
      case priority = 'low':
        return <span className="priority__low">Düşük</span>
      case priority = 'medium':
        return <span className="priority__medium">Orta</span>
      case priority = 'high':
        return <span className="priority__high">Yüksek</span>
      case priority = 'critical':
        return <span className="priority__critical">Kritik</span>
      default:
        break;
    }
  }

  return {
    priorityLevel,
  }
}
