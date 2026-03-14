import { getAllOrders } from "@/action/server/orders";
import VaccinationManagement from '@/components/dashboardlayouts/VaccinationManagement';
import React from 'react';

const page = async () => {
    const orders = await getAllOrders();

    return (
        <div>
            <VaccinationManagement initialOrders={orders} />
        </div>
    );
};

export default page;