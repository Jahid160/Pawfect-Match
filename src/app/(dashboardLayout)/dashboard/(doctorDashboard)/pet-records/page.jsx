import { getCompletedOrdersHistory } from '@/action/doctorServerDash/vaccin';
import PetRecords from '@/Components/dashboardlayouts/DoctorDashboard/PetRecords';
import React from 'react';

const petRecords = async() => {
  const data =await getCompletedOrdersHistory()
  return (
    <div>
      <PetRecords appointments={data}></PetRecords>
    </div>
  );
};

export default petRecords;