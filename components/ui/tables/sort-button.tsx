'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

type SortColumn = 'date' | 'amount';
type SortOrder = 'asc' | 'desc';

interface SortButtonProps {
  column: SortColumn;
  label: string;
  sortBy: SortColumn;
  sortOrder: SortOrder;
  onSort: (column: SortColumn) => void;
  className?: string;
}

export function SortButton({ column, label, sortBy, sortOrder, onSort, className = '' }: SortButtonProps) {
  const isActive = sortBy === column;

  const iconSrc = isActive ? (sortOrder === 'asc' ? '/caret-up-icon.svg' : '/caret-down.svg') : '/caret-down.svg';
  return (
    <button
      type='button'
      onClick={() => onSort(column)}
      className={cn('flex gap-x-2 items-center focus:outline-none focus:ring-2 focus:ring-teal-blue focus:ring-offset-2 rounded-md p-1 -m-1 transition-colors hover:bg-forest-green-9/10', className)}
      aria-label={`Sort by ${label} ${isActive && sortOrder === 'asc' ? 'descending' : 'ascending'}`}>
      {label}
      <Image src={iconSrc} alt='' width={10} height={7} aria-hidden='true' />
    </button>
  );
}
