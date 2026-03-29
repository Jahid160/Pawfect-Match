
import { getAllOrders, getVaccineOrders } from '@/action/server/orders';
import VaccinationManagement from '@/Components/dashboardlayouts/VaccinationManagement';
import React from 'react';

const page = async () => {
    const orders = await getVaccineOrders();

    return (
        <div>
            <VaccinationManagement initialOrders={orders} />
        </div>
    );
};

export default page;