import { getAppointmentsOrders } from '@/action/doctorServerDash/vaccin';
import Appointments from '@/Components/dashboardlayouts/DoctorDashboard/Appointments/Appointments';
import React from 'react';

const appointments = async() => {
  const doctor = await getAppointmentsOrders()
  return (
    <div>
      <Appointments appointments={doctor}></Appointments>
    </div>
  );
};

export default appointments;