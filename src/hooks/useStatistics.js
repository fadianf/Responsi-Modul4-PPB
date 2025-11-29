import { useMemo } from 'react';
import { useTodos } from './useTodos';
import { useJournals } from './useJournals';
import { MOODS } from '../utils/constants';

export function useStatistics() {
	const { todos, loading: todosLoading } = useTodos();
	const { journals, loading: journalsLoading } = useJournals();

	const loading = todosLoading || journalsLoading;

	const totalTodos = todos.length;
	const completedTodos = todos.filter(t => t.is_completed).length;
	const activeTodos = totalTodos - completedTodos;
	const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

	const totalJournals = journals.length;

	const moodDistribution = useMemo(() => {
		return MOODS.map(mood => {
			const count = journals.filter(j => j.mood === mood.value).length;
			const percentage = totalJournals > 0 ? Math.round((count / totalJournals) * 100) : 0;
			return {
				...mood,
				count,
				percentage,
			};
		}).filter(m => m.count > 0);
	}, [journals, totalJournals]);

	// Last 7 days activity
	const last7Days = useMemo(() => {
		return Array.from({ length: 7 }, (_, i) => {
			const date = new Date();
			date.setDate(date.getDate() - i);
			return date.toISOString().split('T')[0];
		}).reverse();
	}, []);

	const activityData = useMemo(() => {
		return last7Days.map(date => {
			const todosOnDate = todos.filter(t => t.created_at && t.created_at.split('T')[0] === date).length;
			const journalsOnDate = journals.filter(j => j.created_at && j.created_at.split('T')[0] === date).length;
			return { date, todos: todosOnDate, journals: journalsOnDate, total: todosOnDate + journalsOnDate };
		});
	}, [todos, journals, last7Days]);

	const maxActivity = Math.max(...activityData.map(d => d.total), 1);

	return {
		loading,
		totalTodos,
		completedTodos,
		activeTodos,
		completionRate,
		totalJournals,
		moodDistribution,
		activityData,
		maxActivity,
	};
}

export default useStatistics;

