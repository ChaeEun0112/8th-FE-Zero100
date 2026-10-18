import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import InquiryTable from '../../components/inquiry/InquiryTable';
import { INQUIRIES } from '../../constants/inquiries';
import { ROUTES } from '../../constants/routes';

import './InquiryPage.css';

function InquiryPage() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate(ROUTES.INQUIRY_CREATE);
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
