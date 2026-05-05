'use client';

import { CheckCircle2, Circle, Calendar, AlertTriangle, TrendingUp, Clock, Menu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UrgencyBadge } from '@/components/analysis/UrgencyBadge';
import { StatCard, DeadlineStat } from '@/components/ui/stat-card';
import { useAppStore } from '@/store/useAppStore';
import { format, isToday, isTomorrow, isThisWeek } from 'date-fns';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { analyses, toggleSidebar } = useAppStore();

  // Calculate statistics
  const allTasks = analyses.flatMap((a) => a.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  
  const criticalTasks = allTasks.filter((t) => t.urgencyLevel === 'critical').length;
  const highUrgencyTasks = allTasks.filter((t) => t.urgencyLevel === 'high').length;
  
  const tasksWithDeadlines = allTasks.filter((t) => t.deadline);
  const dueToday = tasksWithDeadlines.filter((t) => t.deadline && isToday(new Date(t.deadline!))).length;
  const dueTomorrow = tasksWithDeadlines.filter((t) => t.deadline && isTomorrow(new Date(t.deadline!))).length;
  const dueThisWeek = tasksWithDeadlines.filter((t) => t.deadline && isThisWeek(new Date(t.deadline!))).length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get recent analyses
  const recentAnalyses = analyses.slice(0, 5);

  // Get high priority pending tasks
  const highPriorityTasks = allTasks
    .filter((t) => !t.completed && (t.urgencyLevel === 'critical' || t.urgencyLevel === 'high'))
    .sort((a, b) => b.urgencyScore - a.urgencyScore)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your tasks and productivity</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
          className="shrink-0"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          description={`${completedTasks} completed`}
          icon={CheckCircle2}
          trend={completionRate}
        />
        <StatCard
          title="Pending"
          value={pendingTasks}
          description={`${criticalTasks + highUrgencyTasks} high priority`}
          icon={Circle}
          variant="warning"
        />
        <StatCard
          title="Due Soon"
          value={dueToday + dueTomorrow}
          description={`${dueToday} today, ${dueTomorrow} tomorrow`}
          icon={Calendar}
          variant="urgent"
        />
        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          description={`${totalTasks} total analyses`}
          icon={TrendingUp}
          trend={completionRate}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* High Priority Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>High Priority</CardTitle>
                <CardDescription>Tasks requiring immediate attention</CardDescription>
              </div>
              {criticalTasks > 0 && (
                <UrgencyBadge level="critical" size="sm" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            {highPriorityTasks.length > 0 ? (
              <div className="space-y-3">
                {highPriorityTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start justify-between rounded-lg border border-white/10 bg-white/5 p-3"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.content}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <UrgencyBadge level={task.urgencyLevel} size="sm" showLabel={false} />
                        {task.deadline && (
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(task.deadline), 'MMM d')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="mb-2 h-8 w-8 text-green-500/50" />
                <p className="text-sm text-muted-foreground">No high priority tasks</p>
                <p className="text-xs text-muted-foreground/70">You&apos;re all caught up!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Deadline Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Deadline Overview</CardTitle>
            <CardDescription>Upcoming deadlines at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DeadlineStat
              icon={AlertTriangle}
              label="Due Today"
              count={dueToday}
              color="text-red-400"
              bgColor="bg-red-500/20"
            />
            <DeadlineStat
              icon={Clock}
              label="Due Tomorrow"
              count={dueTomorrow}
              color="text-orange-400"
              bgColor="bg-orange-500/20"
            />
            <DeadlineStat
              icon={Calendar}
              label="Due This Week"
              count={dueThisWeek - dueToday - dueTomorrow}
              color="text-yellow-400"
              bgColor="bg-yellow-500/20"
            />
            <DeadlineStat
              icon={CheckCircle2}
              label="No Deadline"
              count={totalTasks - tasksWithDeadlines.length}
              color="text-muted-foreground"
              bgColor="bg-white/10"
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Analyses</CardTitle>
          <CardDescription>Your latest text analyses</CardDescription>
        </CardHeader>
        <CardContent>
          {recentAnalyses.length > 0 ? (
            <div className="space-y-3">
              {recentAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="flex items-start justify-between rounded-lg border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{analysis.summary}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{analysis.tasks.length} tasks</span>
                      <span>{analysis.decisions.length} decisions</span>
                      <span>{analysis.confusionItems.length} clarifications</span>
                      <span>•</span>
                      <span>{format(new Date(analysis.createdAt), 'MMM d, h:mm a')}</span>
                    </div>
                  </div>
                  <UrgencyBadge
                    level={
                      analysis.tasks.some((t) => t.urgencyLevel === 'critical')
                        ? 'critical'
                        : analysis.tasks.some((t) => t.urgencyLevel === 'high')
                          ? 'high'
                          : 'medium'
                    }
                    size="sm"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground">No analyses yet</p>
              <p className="text-xs text-muted-foreground/70">
                Start by analyzing your first text
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
