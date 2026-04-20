"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Trash2,
  Eye,
  Pencil,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const InventoryTab = ({
  foodItems,
  searchTerm,
  setSearchTerm,
  inventoryPage,
  setInventoryPage,
  itemsPerPage = 6,
  onView,
  onEdit,
  onDelete,
}) => {
  const filteredFoods = useMemo(() => {
    return foodItems.filter((item) =>
      item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [foodItems, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFoods.length / itemsPerPage)
  );

  const paginatedFoods = useMemo(() => {
    const start = (inventoryPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredFoods.slice(start, end);
  }, [filteredFoods, inventoryPage, itemsPerPage]);

  const renderPagination = () => {
    if (filteredFoods.length <= itemsPerPage) return null;

    const startItem = (inventoryPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(inventoryPage * itemsPerPage, filteredFoods.length);

    const getVisiblePages = () => {
      const pages = [];
      const maxVisible = 5;

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        let start = Math.max(1, inventoryPage - 2);
        let end = Math.min(totalPages, inventoryPage + 2);

        if (inventoryPage <= 3) {
          start = 1;
          end = 5;
        }

        if (inventoryPage >= totalPages - 2) {
          start = totalPages - 4;
          end = totalPages;
        }

        for (let i = start; i <= end; i++) pages.push(i);
      }

      return pages;
    };

    return (
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 border-t border-base-200">
        <p className="text-sm font-semibold text-slate-500">
          Showing {startItem} to {endItem} of {filteredFoods.length} items
        </p>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={() => setInventoryPage(1)}
            disabled={inventoryPage === 1}
          >
            <ChevronsLeft size={16} />
          </button>

          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={() => setInventoryPage((prev) => prev - 1)}
            disabled={inventoryPage === 1}
          >
            <ChevronLeft size={16} />
          </button>

          {getVisiblePages().map((page) => (
            <button
              key={page}
              className={`btn btn-sm rounded-xl min-w-[40px] ${
                inventoryPage === page
                  ? "btn-primary text-white"
                  : "btn-ghost text-slate-600"
              }`}
              onClick={() => setInventoryPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={() => setInventoryPage((prev) => prev + 1)}
            disabled={inventoryPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>

          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={() => setInventoryPage(totalPages)}
            disabled={inventoryPage === totalPages}
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stats shadow-sm bg-base-100 border border-base-300 rounded-3xl">
          <div className="stat">
            <div className="stat-title font-bold text-slate-500 uppercase text-xs">
              Total Stock
            </div>
            <div className="stat-value text-primary text-3xl font-black">
              {foodItems.reduce((acc, item) => acc + (Number(item.stock) || 0), 0)}
            </div>
          </div>
        </div>

        <div className="stats shadow-sm bg-base-100 border border-base-300 rounded-3xl">
          <div className="stat">
            <div className="stat-title font-bold text-slate-500 uppercase text-xs">
              Low Stock
            </div>
            <div className="stat-value text-error text-3xl font-black">
              {foodItems.filter((item) => Number(item.stock) < 15).length}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-base-300 overflow-hidden">
        <div className="p-6 border-b border-base-200 flex items-center gap-3">
          <Search className="text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search inventory..."
            className="w-full outline-none font-bold text-slate-700 bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto p-4">
          <table className="table w-full">
            <thead>
              <tr className="text-slate-400 uppercase text-[11px] font-black border-none">
                <th>Product</th>
                <th>Stock</th>
                <th>Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedFoods.length > 0 ? (
                paginatedFoods.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-base-200/50 transition-colors border-b border-base-200 last:border-none"
                  >
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="mask mask-squircle w-12 h-12 bg-base-200 relative overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.png"}
                            alt={item.productName || "Food"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-black text-slate-800 italic">
                            {item.productName}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            {item.brand}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <p
                        className={`font-black ${
                          Number(item.stock) < 15
                            ? "text-error"
                            : "text-slate-700"
                        }`}
                      >
                        {item.stock} Units
                      </p>
                    </td>

                    <td>
                      <div className="flex flex-col">
                        <p className="font-black text-neutral text-lg">
                          ${item.discountPrice || item.price}
                        </p>

                        {item.discountPrice &&
                          Number(item.discountPrice) < Number(item.price) && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-400 line-through">
                                ${item.price}
                              </span>
                              <span className="text-[10px] font-black text-success uppercase tracking-tighter">
                                {Math.round(
                                  ((item.price - item.discountPrice) /
                                    item.price) *
                                    100
                                )}
                                % OFF
                              </span>
                            </div>
                          )}
                      </div>
                    </td>

                    <td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onView(item)}
                          className="btn btn-circle btn-ghost btn-sm text-info"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => onEdit(item)}
                          className="btn btn-circle btn-ghost btn-sm text-primary"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => onDelete(item._id, item.productName)}
                          className="btn btn-circle btn-ghost btn-sm text-error"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-12">
                    <p className="text-slate-400 font-black italic">
                      No matching food found.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {renderPagination()}
      </div>
    </div>
  );
};

export default InventoryTab;
