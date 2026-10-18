import { useNavigate } from 'react-router-dom';

import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import InfoCard from '../../components/dashboard/InfoCard';
import { ROUTES } from '../../constants/routes';

import './DashboardPage.css';

const SIDEBAR_ITEMS = [
  { label: '대시보드 홈', to: ROUTES.DASHBOARD },
  { label: '문의' },
  { label: '마이페이지' },
];

const MY_INFO = [
  { label: '이름', value: '홍길동' },
  { label: '이메일', value: 'hong@example.com' },
  { label: '가입일', value: '2024.01.15' },
];

const INQUIRY_STATUS = [
  { label: '전체 문의', value: '24건' },
  { label: '내가 쓴 문의', value: '8건' },
];

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: 로그인 API 연동 후 토큰 삭제 처리 추가
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="dashboard-page">
      <Header onAction={handleLogout} />

      <div className="dashboard-body">
        <Sidebar items={SIDEBAR_ITEMS} activeItem="대시보드 홈" />

        <main className="dashboard-main">
          <h2 className="dashboard-title">대시보드</h2>

          <div className="dashboard-cards">
            <InfoCard title="내 정보" rows={MY_INFO} />
            <InfoCard title="문의 현황" rows={INQUIRY_STATUS} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default DashboardPage;
