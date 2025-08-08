'use client';
import { useState } from 'react';
import TransactionTable from '@/components/ui/tables/transaction-table';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'transactions', label: 'Transactions' },
] as const;

const TAB_STYLES = {
  container: 'border-b border-muted-blue-20/20 mb-8',
  nav: 'flex space-x-2 text-brick-brown-62/62',
  tab: {
    base: 'py-2 sm:py-3 px-4 lg:px-7 font-medium focus:border-sky-teal-45 focus:border-b-[1.5px] transition-colors',
    active: 'border-sky-teal-45 border-b-[1.5px] text-color-teal-blue',
    inactive: 'hover:text-color-teal-blue',
  },
  content: {
    transactions: 'bg-white rounded-lg shadow-sm border border-gray-200 p-8',
    placeholder: 'text-center text-gray-500',
  },
} as const;

type TabId = (typeof TABS)[number]['id'];

const TabSection = () => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
  };

  const getTabClasses = (tabId: TabId) => {
    const isActive = activeTab === tabId;
    return `${TAB_STYLES.tab.base} ${isActive ? TAB_STYLES.tab.active : TAB_STYLES.tab.inactive}`;
  };

  return (
    <section aria-label='Dashboard content'>
      {/* Tab Navigation */}
      <div className={TAB_STYLES.container}>
        <nav className={TAB_STYLES.nav} role='tablist' aria-label='Dashboard sections'>
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              type='button'
              role='tab'
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              tabIndex={index === 0 ? 0 : -1}
              onClick={() => handleTabChange(tab.id)}
              className={getTabClasses(tab.id)}>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Panels */}
      <div role='tabpanel' id={`${activeTab}-panel`} aria-labelledby={`${activeTab}-tab`}>
        {activeTab === 'transactions' && (
          <div className={TAB_STYLES.content.transactions}>
            <div className={TAB_STYLES.content.placeholder}>
              <h3 className='text-lg font-medium mb-2'>Transaction Dashboard</h3>
              <p>Transaction content would be displayed here.</p>
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div>
            <TransactionTable />
          </div>
        )}
      </div>
    </section>
  );
};

export default TabSection;
