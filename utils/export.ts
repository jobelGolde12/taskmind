/**
 * Export utilities for TaskMind AI
 * Supports JSON, CSV, Markdown, and PDF export
 */

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

export interface ExportData {
  summary: string;
  originalText: string;
  tasks: Array<{
    content: string;
    completed: boolean;
    urgencyLevel: string;
    urgencyScore: number;
    deadline: string | null;
    deadlineDisplay: string | null;
    category: string;
  }>;
  decisions: Array<{
    content: string;
    stakeholders: string | null;
  }>;
  confusionItems: Array<{
    item: string;
    suggestion: string | null;
  }>;
  language: string;
  createdAt: string;
}

/**
 * Export as JSON
 */
export function exportToJSON(data: ExportData, filename?: string): void {
  const content = JSON.stringify(data, null, 2);
  downloadFile(content, `${filename || 'taskmind-export'}.json`, 'application/json');
}

/**
 * Export as CSV
 */
export function exportToCSV(data: ExportData, filename?: string): void {
  const headers = ['Task', 'Status', 'Urgency', 'Score', 'Deadline', 'Category'];
  
  const rows = data.tasks.map((task) => [
    `"${escapeCsv(task.content)}"`,
    task.completed ? 'Completed' : 'Pending',
    task.urgencyLevel,
    task.urgencyScore,
    task.deadlineDisplay || task.deadline || 'No deadline',
    task.category,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  downloadFile(csvContent, `${filename || 'taskmind-tasks'}.csv`, 'text/csv');
}

/**
 * Export as Markdown
 */
export function exportToMarkdown(data: ExportData, filename?: string): void {
  let content = `# ${data.summary}\n\n`;
  
  content += `**Generated:** ${format(new Date(data.createdAt), 'PPP p')}\n`;
  content += `**Language:** ${data.language === 'fil' ? 'Filipino' : 'English'}\n`;
  content += `**Original Text:** ${data.originalText.length > 200 ? data.originalText.slice(0, 200) + '...' : data.originalText}\n\n`;
  
  content += `---\n\n`;
  
  // Tasks
  content += `## Tasks (${data.tasks.length})\n\n`;
  if (data.tasks.length > 0) {
    data.tasks.forEach((task, index) => {
      content += `### ${index + 1}. ${task.content}\n\n`;
      content += `- **Status:** ${task.completed ? '✅ Completed' : '⏳ Pending'}\n`;
      content += `- **Priority:** ${getUrgencyEmoji(task.urgencyLevel)} ${task.urgencyLevel.toUpperCase()}\n`;
      content += `- **Urgency Score:** ${task.urgencyScore}/100\n`;
      if (task.deadline) {
        content += `- **Deadline:** ${task.deadlineDisplay || format(new Date(task.deadline), 'PPP p')}\n`;
      }
      content += `- **Category:** ${task.category}\n\n`;
    });
  } else {
    content += `*No tasks extracted*\n\n`;
  }
  
  // Decisions
  if (data.decisions.length > 0) {
    content += `---\n\n`;
    content += `## Decisions (${data.decisions.length})\n\n`;
    data.decisions.forEach((decision, index) => {
      content += `### ${index + 1}. ${decision.content}\n\n`;
      if (decision.stakeholders) {
        content += `**Stakeholders:** ${decision.stakeholders}\n\n`;
      }
    });
  }
  
  // Confusion Items
  if (data.confusionItems.length > 0) {
    content += `---\n\n`;
    content += `## Needs Clarification (${data.confusionItems.length})\n\n`;
    data.confusionItems.forEach((item, index) => {
      content += `### ${index + 1}. ${item.item}\n\n`;
      if (item.suggestion) {
        content += `**Suggestion:** ${item.suggestion}\n\n`;
      }
    });
  }
  
  // Summary Stats
  content += `---\n\n`;
  content += `## Summary\n\n`;
  const completedCount = data.tasks.filter((t) => t.completed).length;
  const pendingCount = data.tasks.length - completedCount;
  const highPriorityCount = data.tasks.filter((t) => t.urgencyLevel === 'high' || t.urgencyLevel === 'critical').length;
  
  content += `- **Total Tasks:** ${data.tasks.length}\n`;
  content += `- **Completed:** ${completedCount}\n`;
  content += `- **Pending:** ${pendingCount}\n`;
  content += `- **High Priority:** ${highPriorityCount}\n`;
  content += `- **Completion Rate:** ${data.tasks.length > 0 ? Math.round((completedCount / data.tasks.length) * 100) : 0}%\n`;

  downloadFile(content, `${filename || 'taskmind-analysis'}.md`, 'text/markdown');
}

/**
 * Export as PDF
 */
export function exportToPDF(data: ExportData, filename?: string): void {
  const doc = new jsPDF();
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - 2 * margin;
  
  let y = margin;
  
  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('TaskMind AI Analysis', margin, y);
  y += 10;
  
  // Summary
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const summaryLines = doc.splitTextToSize(`Summary: ${data.summary}`, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 6 + 4;
  
  // Metadata
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(`Generated: ${format(new Date(data.createdAt), 'PP p')}`, margin, y);
  y += 5;
  doc.text(`Tasks: ${data.tasks.length} | Decisions: ${data.decisions.length} | Clarifications: ${data.confusionItems.length}`, margin, y);
  y += 10;
  
  // Tasks Table
  if (data.tasks.length > 0) {
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Tasks', margin, y);
    y += 7;
    
    const tableData = data.tasks.map((task) => [
      task.content.length > 50 ? task.content.substring(0, 50) + '...' : task.content,
      task.completed ? '✓' : '○',
      getUrgencyLabel(task.urgencyLevel),
      task.deadlineDisplay || 'No deadline',
    ]);
    
    (doc as any).autoTable({
      startY: y,
      head: [['Task', 'Status', 'Priority', 'Deadline']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] },
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: contentWidth - 60 },
        1: { cellWidth: 15, halign: 'center' },
        2: { cellWidth: 25 },
        3: { cellWidth: 50 },
      },
    });
    
    y = (doc as any).lastAutoTable.finalY + 10;
  }
  
  // Decisions
  if (data.decisions.length > 0) {
    // Check if we need a new page
    if (y > 250) {
      doc.addPage();
      y = margin;
    }
    
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Decisions', margin, y);
    y += 7;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    data.decisions.forEach((decision) => {
      const decisionLines = doc.splitTextToSize(`• ${decision.content}`, contentWidth);
      doc.text(decisionLines, margin, y);
      y += decisionLines.length * 5 + 2;
    });
    
    y += 4;
  }
  
  // Confusion Items
  if (data.confusionItems.length > 0) {
    if (y > 250) {
      doc.addPage();
      y = margin;
    }
    
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Needs Clarification', margin, y);
    y += 7;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    data.confusionItems.forEach((item) => {
      const itemLines = doc.splitTextToSize(`⚠ ${item.item}`, contentWidth);
      doc.text(itemLines, margin, y);
      y += itemLines.length * 5 + 2;
    });
  }
  
  doc.save(`${filename || 'taskmind-analysis'}.pdf`);
}

/**
 * Export all formats
 */
export function exportAll(data: ExportData, filename?: string): void {
  exportToJSON(data, filename);
  setTimeout(() => exportToCSV(data, filename), 100);
  setTimeout(() => exportToMarkdown(data, filename), 200);
  setTimeout(() => exportToPDF(data, filename), 300);
}

// Helper functions

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeCsv(text: string): string {
  return text.replace(/"/g, '""');
}

function getUrgencyEmoji(level: string): string {
  switch (level) {
    case 'critical':
      return '🔴';
    case 'high':
      return '🟠';
    case 'medium':
      return '🟡';
    case 'low':
      return '🔵';
    default:
      return '⚪';
  }
}

function getUrgencyLabel(level: string): string {
  switch (level) {
    case 'critical':
      return 'Critical';
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
    default:
      return level;
  }
}
