'use client';
import Image from 'next/image';
import { TEAM_PROFILES } from '@/lib/constants/profiles';

const STYLES = {
  container: 'w-full max-w-[976px] pt-4 lg:pt-6 pb-0',
  desktop: {
    container: 'hidden md:flex items-start justify-between',
    titleSection: 'flex items-center gap-x-3 lg:gap-x-4 min-w-0 flex-1',
    titleWrapper: 'flex items-center space-x-2 lg:space-x-3 min-w-0',
    title: 'font-bold text-2xl lg:text-4xl-custom leading-8 lg:leading-10 tracking-tight truncate',
    statusBadge: 'flex items-center space-x-2 bg-forest-green-9/10 rounded-2xl px-2 py-1 flex-shrink-0',
    actions: 'flex items-start gap-2 lg:gap-3',
  },
  mobile: {
    container: 'md:hidden space-y-3',
    titleRow: 'flex items-center justify-between',
    titleWrapper: 'flex items-center space-x-2 min-w-0 flex-1',
    title: 'font-bold text-xl leading-7 tracking-tight truncate',
    statusRow: 'flex items-center',
    statusBadge: 'flex items-center space-x-2 bg-forest-green-9/10 rounded-2xl px-2 py-1',
  },
  profiles: {
    container: 'flex items-center gap-x-2 lg:gap-x-3 mt-4 lg:my-6',
    avatarGroup: 'flex -space-x-2 lg:-space-x-3',
    namesContainer: 'flex gap-x-1 items-center text-brick-brown-62/62 leading-5 tracking-[-0.005em] text-sm lg:text-base min-w-0',
  },
  buttons: {
    share:
      'text-center bg-sky-teal-45 py-1.5 lg:py-2 px-3 lg:px-4 rounded-2xl text-sm lg:text-base text-white focus:outline-none focus:ring-2 focus:ring-sky-teal-45 focus:ring-offset-2 transition-colors hover:bg-[#3a6b7a]',
    more: 'bg-white p-1.5 lg:p-2 flex items-center border-[1.5px] border-muted-blue-20/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-gray-16 focus:ring-offset-2 transition-colors hover:bg-gray-50',
  },
} as const;

const DashboardHeader = () => {
  const handleShareClick = () => {
    // TODO: Implement share functionality
    console.log('Share clicked');
  };

  const handleMoreClick = () => {
    // TODO: Implement more actions menu
    console.log('More actions clicked');
  };

  const getProfileVisibility = (index: number) => {
    if (index >= 4) return 'hidden';
    if (index >= 3) return 'hidden md:block';
    return '';
  };

  const getProfileZIndex = (index: number) => ({
    zIndex: TEAM_PROFILES.length - index,
  });

  return (
    <header className={STYLES.container}>
      {/* Desktop Layout */}
      <div className={STYLES.desktop.container}>
        <div className={STYLES.desktop.titleSection}>
          <div className={STYLES.desktop.titleWrapper}>
            <h1 className={STYLES.desktop.title}>Wallet Ledger</h1>
            <button type='button' aria-label='Wallet options' className='flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-sm'>
              <Image src='/caret-down.svg' alt='' width={10} height={6} aria-hidden='true' />
            </button>
          </div>

          <div className={STYLES.desktop.statusBadge} role='status' aria-label='Wallet status: Active'>
            <Image src='/status-dot.svg' alt='' width={6} height={7} aria-hidden='true' />
            <span className='font-medium text-center text-sm lg:text-base'>Active</span>
          </div>
        </div>

        <div className={STYLES.desktop.actions}>
          <button type='button' onClick={handleShareClick} className={STYLES.buttons.share}>
            Share
          </button>
          <button type='button' onClick={handleMoreClick} className={STYLES.buttons.more} aria-label='More actions'>
            <Image src='/ellipsis.svg' alt='' width={20} height={21} className='lg:w-6 lg:h-[25px]' aria-hidden='true' />
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={STYLES.mobile.container}>
        <div className={STYLES.mobile.titleRow}>
          <div className={STYLES.mobile.titleWrapper}>
            <h1 className={STYLES.mobile.title}>Wallet Ledger</h1>
            <button type='button' aria-label='Wallet options' className='flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded-sm'>
              <Image src='/caret-down.svg' alt='' width={8} height={5} aria-hidden='true' />
            </button>
          </div>
        </div>

        <div className={STYLES.mobile.statusRow}>
          <div className={STYLES.mobile.statusBadge} role='status' aria-label='Wallet status: Active'>
            <Image src='/status-dot.svg' alt='' width={6} height={7} aria-hidden='true' />
            <span className='font-medium text-center text-sm'>Active</span>
          </div>
        </div>
      </div>

      <div className={STYLES.profiles.container}>
        <div className={STYLES.profiles.avatarGroup} role='group' aria-label='Team members'>
          {TEAM_PROFILES.map((profile, index) => (
            <div key={profile.id} className={getProfileVisibility(index)} style={getProfileZIndex(index)}>
              <Image src={profile.image} alt={`${profile.name}'s profile picture`} width={32} height={32} className='w-8 h-8 lg:size-[41px] rounded-full' />
            </div>
          ))}
        </div>

        <div className={STYLES.profiles.namesContainer}>
          {/* Desktop*/}
          <div className='hidden md:flex gap-x-1'>
            <span>Ava, Liam, Noah</span>
            <span>+12 others</span>
          </div>

          {/* Mobile */}
          <div className='md:hidden pl-0.5'>
            <span>+11 members</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
