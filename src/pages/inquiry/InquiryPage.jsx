import Button from '../../components/common/Button';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import InquiryTable from '../../components/inquiry/InquiryTable';

import './InquiryPage.css';

const INQUIRIES = [
  { id: 1, title: '서비스 이용 관련 문의드립니다', createdAt: '2026년 3월 25일 17:11' },
  { id: 2, title: '결제 시스템에 대해 질문이 있습니다', createdAt: '2026년 3월 24일 14:30' },
  { id: 3, title: '회원가입이 되지 않습니다', createdAt: '2026년 3월 23일 09:15' },
  { id: 4, title: '대시보드 기능 개선 요청', createdAt: '2026년 3월 22일 16:45' },
  { id: 5, title: 'API 연동 방법 문의', createdAt: '2026년 3월 21일 11:20' },
];

function InquiryPage() {
  const handleCreate = () => {
    // TODO: 문의 등록 기능 구현
  };

  return (
    <DashboardLayout>
      <div className="inquiry-page">
        <div className="inquiry-page__header">
          <h2 className="inquiry-page__title">문의 목록</h2>
          <Button onClick={handleCreate}>문의 등록</Button>
        </div>

        <InquiryTable inquiries={INQUIRIES} />
      </div>
    </DashboardLayout>
  );
}

export default InquiryPage;
