import RightContent from '@/components/organism/RightContent';
import PromotionPanel from '../components/organism/PromotionPanel';

export default function Home() {
  return (
    <div className="flex h-screen">
      <PromotionPanel />
      <RightContent />
    </div>
  );
}
